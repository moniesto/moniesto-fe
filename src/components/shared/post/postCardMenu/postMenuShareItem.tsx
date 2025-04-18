import { DownloadOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { WrappedModal } from "../../common/wrappedModal";
import Logo from "../../common/logo";
import { colorByNumberValue } from "../../../../services/utils";
import { useTranslate } from "../../../../hooks/useTranslate";
import { Post } from "../../../../interfaces/post";
import api from "../../../../services/api";
import localStorageService from "../../../../services/localStorageService";
// import AnimatedNumbers from "react-animated-numbers";
import { Spinner } from "../../common/spinner";
import { LoadingButton } from "@mui/lab";
import { Buffer } from "buffer";
import html2canvas from "html2canvas";
import imageService from "../../../../services/imageService";

export const PostMenushareItem = ({
  post,
  onClose,
}: {
  post: Post;
  onClose: () => void;
}) => {
  const translate = useTranslate();
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [isDownloadEnable, setIsDownloadEnable] = useState(false);
  const contentRef = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>();
  const [values, setValues] = useState({
    pnl: 0,
    roi: 0,
    price: 0,
  });

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const time = new Date().toLocaleTimeString(
    localStorageService.getStorage().language
  );
  const date =
    new Date().toLocaleDateString(localStorageService.getStorage().language) +
    " " +
    time.split(":")[0] +
    ":" +
    time.split(":")[1];

  const dataUrlToFile = (dataUrl: string) => {
    const arr = dataUrl.split(",");
    if (arr.length < 2) {
      return undefined;
    }
    const mimeArr = arr[0].match(/:(.*?);/);
    if (!mimeArr || mimeArr.length < 2) {
      return undefined;
    }
    const mime = mimeArr[1];
    const buff = Buffer.from(arr[1], "base64");
    return new File([buff], "moniesto.png", { type: mime });
  };

  const fetchCurrency = useCallback(
    async (currency: string, market_type: string) => {
      const coins = await api.crypto.search_currencies(currency, market_type);
      const coin = coins.find((item) => item.currency === currency);
      return coin;
    },
    []
  );

  const share = async () => {
    setLoading(true);

    if (!canvas.current) {
      setLoading(false);
      return;
    }
    const dataURL = canvas.current.toDataURL("image/png");

    try {
      await navigator
        .share({
          files: [dataUrlToFile(dataURL) as File],
        })
        .catch((error) => console.log("catch error :", error))
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log("can not share");
      const link = document.createElement("a");
      link.download = `moniesto_${new Date().getTime()}.png`;
      link.href = dataURL;
      link.click();

      setLoading(false);
    }
  };

  useEffect(() => {
    if (post.finished) {
      setValues({
        pnl: post.pnl,
        roi: post.roi,
        price: post?.hit_price || 0,
      });
      setImgLoading(false);
      return;
    }
    fetchCurrency(post.currency, post.market_type)
      .then((resCurrency) => {
        api.post
          .calculate_pnl_roi({
            direction: post.direction,
            leverage: post.leverage,
            start_price: post.start_price,
            take_profit: Number(resCurrency?.price) || 0,
          })
          .then((roiPnlRes) => {
            setValues({
              ...roiPnlRes,
              price: resCurrency?.price || 0,
            });
          })
          .catch(console.log)
          .finally(() => setImgLoading(false));
      })
      .catch(console.error);
  }, [fetchCurrency, post]);

  useEffect(() => {
    if (values.price && !imgLoading) {
      setTimeout(() => {
        html2canvas(contentRef.current as HTMLElement, {
          useCORS: true,
          allowTaint: true,
        })
          .then((canvasRes) => {
            canvas.current = canvasRes;
            setIsDownloadEnable(true);
          })
          .catch(console.error);
      }, 500);
    }
  }, [canvas, values, imgLoading, contentRef]);

  return (
    <WrappedModal opened onClose={onClose} width={600}>
      {!values.price ? (
        <Box minHeight={360}>
          <Spinner center sx={{ color: "white", zIndex: 2 }} />
        </Box>
      ) : (
        <Stack sx={{ borderRadius: "8px", overflow: "hidden" }}>
          <Stack
            ref={contentRef}
            sx={{
              padding: { xs: "20px 12.5px", md: "30px 20px" },
              background: "var(--theme-color-primary)",
              minHeight: 360,
              position: "relative",
              backgroundImage: `url('${imageService.getFirebaseImagePath(
                values.roi >= 0
                  ? "analysis/rocket-min.jpg"
                  : "analysis/meteor4-min.jpg"
              )}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            justifyContent="space-around"
            gap={4}
          >
            <Stack
              justifyContent="space-between"
              direction={{ xs: "column-reverse", md: "row" }}
              alignItems={{ xs: "unset", md: "center" }}
              gap={{ xs: 3, md: 1 }}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <Avatar
                  src={post.user.profile_photo_thumbnail_link}
                  sx={{ width: 40, border: "2px solid rgba(255,255,255,0.3)" }}
                ></Avatar>
                <Stack gap={0.5}>
                  <Typography
                    sx={{ color: "white", opacity: 0.8 }}
                    variant="h4"
                  >
                    {post.user.username}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: "white", opacity: 0.8 }}
                  >
                    {date}
                  </Typography>
                </Stack>
              </Stack>
              <Logo mode="light" width={matches ? 100 : 130}></Logo>
            </Stack>

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
                    color: colorByNumberValue(
                      post.direction === "long" ? 1 : -1
                    ),
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
                    color: colorByNumberValue(values.roi),
                    fontSize: { xs: 34, md: 52 },
                    display: "flex",
                    alignItems: "center",
                    // ">div": {
                    //   fontSize: { xs: 34, md: 52 },
                    // },
                  }}
                  variant="h1"
                >
                  {values.roi > 0 && "+"}
                  {
                    values.price && values.roi

                    // (
                    //   <AnimatedNumbers
                    //     includeComma
                    //     animateToNumber={values.roi}
                    //     locale="en-US"
                    //   ></AnimatedNumbers>
                    // )
                  }
                  %
                </Typography>
              </Stack>
            </Stack>

            <Stack
              gap={1}
              sx={{
                // padding: { xs: 1, md: 1.5 },
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
                        sx={{ color: "white", opacity: 0.95 }}
                      >
                        {translate(
                          "component.post_card.menu.share.entry_price"
                        )}
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
                        sx={{ color: "white", opacity: 0.95 }}
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
                        : {values.price}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="h5"
                        sx={{ color: "white", opacity: 0.95 }}
                      >
                        {translate("component.post_card.status.title")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        fontWeight={600}
                        variant="h5"
                        sx={{ color: "white" }}
                      >
                        :{" "}
                        {translate("component.post_card.status." + post.status)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </Stack>
      )}

      <Stack direction="row" mt={2} gap={{ xs: 2, md: 4 }}>
        <Button
          onClick={onClose}
          type="button"
          sx={{ flex: 1 }}
          variant="outlined"
          color="inherit"
        >
          {translate("common.cancel")}
        </Button>
        <LoadingButton
          disabled={!isDownloadEnable}
          loading={loading}
          onClick={share}
          sx={{ flex: 1 }}
          color="secondary"
          variant="contained"
          startIcon={<DownloadOutlined />}
        >
          {translate("common.save")}
        </LoadingButton>
      </Stack>
    </WrappedModal>
  );
};
