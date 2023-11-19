import { DownloadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { WrappedModal } from "../../common/wrappedModal";
import Logo from "../../common/logo";
import imageService from "../../../../services/imageService";
import { colorByNumberValue } from "../../../../services/utils";
import { useTranslate } from "../../../../hooks/useTranslate";
import * as htmlToImage from "html-to-image";
import { Post } from "../../../../interfaces/post";
import api from "../../../../services/api";
import localStorageService from "../../../../services/localStorageService";
import AnimatedNumbers from "react-animated-numbers";

export const PostMenushareItem = ({
  post,
  onClose,
}: {
  post: Post;
  onClose: () => void;
}) => {
  const translate = useTranslate();

  const domEl = useRef<HTMLElement | null>(null);

  const [pnlRoi, setPnlRoi] = useState({
    pnl: 0,
    roi: 0,
    price: 0,
  });

  const date =
    new Date().toLocaleDateString(localStorageService.getStorage().language) +
    " " +
    new Date().toLocaleTimeString(localStorageService.getStorage().language);

  const fetchCurrency = useCallback(
    async (currency: string, market_type: string) => {
      const coins = await api.crypto.search_currencies(currency, market_type);
      const coin = coins.find((item) => item.currency === currency);
      return coin;
    },
    []
  );

  useEffect(() => {
    fetchCurrency(post.currency, post.market_type)
      .then((resCurrency) => {
        api.post
          .calculate_pnl_roi({
            direction: post.direction,
            leverage: post.leverage,
            start_price: post.start_price,
            take_profit: post.take_profit,
          })
          .then((roiPnlRes) => {
            setPnlRoi({
              ...roiPnlRes,
              price: resCurrency?.price || 0,
            });
          })
          .catch(console.log);
      })
      .catch(console.error);
  }, [fetchCurrency, post]);

  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current as HTMLElement);
    const blob = await (await fetch(dataUrl)).blob();

    const file = new File([blob], "fileName.png", { type: blob.type });
    try {
      navigator.share({
        text: "Moniesto",
        files: [file],
      });
    } catch (error) {
      console.log("error :", error);

      const link = document.createElement("a");
      link.download = "html-to-img.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <WrappedModal opened={true} onClose={onClose} width={600}>
      <Stack
        ref={domEl}
        gap={4}
        sx={{
          background: "var(--theme-color-primary)",
          padding: { xs: "20px 12.5px", md: "30px 20px" },
          borderRadius: "8px",
          minHeight: 380,
          position: "relative",
        }}
        justifyContent="space-around"
      >
        <Logo mode="light" width={130}></Logo>

        <Box
          sx={{
            width: { xs: 120, md: 240 },
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <img
            width="100%"
            src={imageService.getFirebaseImagePath("analysis/rocket.png")}
            alt="rocket"
          />
        </Box>

        <Stack gap={3}>
          <Stack gap={1} direction="row" alignItems="center">
            <Typography
              variant="h4"
              sx={{ color: "var(--color-yellow-primary)" }}
            >
              {post.currency}
            </Typography>
            <Typography variant="h4" sx={{ color: "white" }}>
              {" "}
              |{" "}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: colorByNumberValue(post.direction === "long" ? 1 : -1),
              }}
            >
              {translate(`common.${post.direction}`).toUpperCase()}
            </Typography>
            <Typography variant="h4" sx={{ color: "white" }}>
              {post.leverage !== 1 && ` |  ${post.leverage}X`}
            </Typography>
          </Stack>
          <Stack>
            <Typography
              sx={{
                color: colorByNumberValue(post.direction === "long" ? 1 : -1),
                fontSize: { xs: 32, md: 52 },
                display: "flex",
              }}
              variant="h1"
            >
              +
              {pnlRoi.price && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={post.finished ? post.roi : pnlRoi.roi}
                  fontStyle={{ fontSize: 52 }}
                  locale="en-US"
                ></AnimatedNumbers>
              )}
              %
            </Typography>
          </Stack>
        </Stack>

        <Stack
          gap={1}
          sx={{
            background: "#3d3f51",
            padding: { xs: 1, md: 1.5 },
            borderRadius: "12px",
          }}
        >
          <Table sx={{ width: 180 }}>
            <TableBody
              sx={{
                td: {
                  borderBottom: 0,
                  padding: { xs: "2px 4px", md: 0.5 },
                },
              }}
            >
              <TableRow>
                <TableCell>
                  <Typography
                    variant="h5"
                    sx={{ color: "white", opacity: 0.7 }}
                  >
                    {translate("component.post_card.menu.share.entry_price")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={600}
                    variant="h5"
                    sx={{ color: "white" }}
                  >
                    : {post.start_price}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="h5"
                    sx={{ color: "white", opacity: 0.7 }}
                  >
                    {translate(
                      `component.post_card.menu.share.${
                        post.finished ? "closed_price" : "current_price"
                      }`
                    )}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={600}
                    variant="h5"
                    sx={{ color: "white" }}
                  >
                    : {pnlRoi.price}$
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="h5"
                    sx={{ color: "white", opacity: 0.7 }}
                  >
                    {translate("component.post_card.menu.share.date")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={600}
                    variant="h5"
                    sx={{ color: "white" }}
                  >
                    : {date}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Stack>
      <Stack direction="row" mt={2} spacing={4}>
        <Button
          onClick={onClose}
          type="button"
          sx={{ flex: 1 }}
          variant="outlined"
          color="inherit"
        >
          {translate("common.cancel")}
        </Button>
        <Button
          onClick={downloadImage}
          sx={{ flex: 1 }}
          color="secondary"
          variant="contained"
          startIcon={<DownloadOutlined />}
        >
          {translate("common.save")}
        </Button>
      </Stack>
    </WrappedModal>
  );
};
