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
  useMediaQuery,
  useTheme,
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
import { Spinner } from "../../common/spinner";
import { LoadingButton } from "@mui/lab";

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

  // const sharingIframe = useRef<HTMLIFrameElement>();

  const domEl = useRef<HTMLElement | null>(null);

  const [values, setValues] = useState({
    pnl: 0,
    roi: 0,
    price: 0,
  });

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const date =
    new Date().toLocaleDateString(localStorageService.getStorage().language) +
    " " +
    new Date()
      .toLocaleTimeString(localStorageService.getStorage().language)
      .substring(0, 5);

  const fetchCurrency = useCallback(
    async (currency: string, market_type: string) => {
      const coins = await api.crypto.search_currencies(currency, market_type);
      const coin = coins.find((item) => item.currency === currency);
      return coin;
    },
    []
  );

  const imagePath =
    values.price &&
    imageService.getFirebaseImagePath(
      `analysis/${values.roi >= 0 ? "rocket" : "meteor4"}.jpg`
    );

  useEffect(() => {
    fetchCurrency(post.currency, post.market_type)
      .then((resCurrency) => {
        if (post.finished) {
          setValues({
            pnl: post.pnl,
            roi: post.roi,
            price: resCurrency?.price || 0,
          });
          return;
        }
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
          .catch(console.log);
      })
      .catch(console.error);
  }, [fetchCurrency, post]);

  // useEffect(() => {
  //   // create an invisible "sharing iframe" once
  //   sharingIframe.current = document.createElement("iframe");
  //   var sharingIframeBlob = new Blob([`<!DOCTYPE html><html>`], {
  //     type: "text/html",
  //   });
  //   sharingIframe.current.src = URL.createObjectURL(sharingIframeBlob);
  //   sharingIframe.current.id = "shareIframe";
  //   sharingIframe.current.allow = "web-share";

  //   sharingIframe.current.style.display = "none"; // make it so that it is hidden

  //   document.documentElement.appendChild(sharingIframe.current); // add it to the DOM

  //   return () => {
  //     console.log("remove iframe", sharingIframe);
  //     const child = document.getElementById("shareIframe");
  //     document.documentElement.removeChild(child as Node);
  //   };
  // }, []);

  const downloadImage = useCallback(async () => {
    setLoading(true);

    // const dataUrl = await htmlToImage.toPng(domEl.current as HTMLElement);
    // const blob = await (await fetch(dataUrl)).blob();

    // const file = new File([blob], "moniesto.png", { type: blob.type });

    // console.log("dataUrl :", dataUrl, "file :", file, "navigator :", navigator);

    if (
      navigator.canShare({
        title: "moniesto test title",
        // files: [file],
      })
    ) {
      console.log("can share");
      await navigator
        .share({
          // files: [file],
        })
        .catch((error) => console.log("catch error :", error))
        .finally(() => {
          setLoading(false);
          // sharingIframe.current?.contentWindow?.location.reload();
        });
    } else {
      console.log("can not share");
      // const link = document.createElement("a");
      // link.download = `moniesto_${new Date().getTime()}.png`;
      // link.href = dataUrl;
      // link.click();
      setLoading(false);
    }
  }, []);

  const handleImageLoad = () => {
    setImgLoading(false);
  };

  return (
    <WrappedModal opened={true} onClose={onClose} width={600}>
      <img
        style={{ display: "none" }}
        src={imagePath as string}
        onLoad={handleImageLoad}
        alt=""
      />
      {!values.price && <Spinner center sx={{ color: "white", zIndex: 2 }} />}
      <Stack sx={{ borderRadius: "8px", overflow: "hidden" }}>
        <Stack
          ref={domEl}
          gap={4}
          sx={{
            background: "var(--theme-color-primary)",
            padding: { xs: "20px 12.5px", md: "30px 20px" },

            minHeight: 360,
            position: "relative",
            backgroundImage: `url('${imagePath}')`,
            backgroundBlendMode: "soft-light",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          justifyContent="space-around"
        >
          <Stack
            justifyContent="space-between"
            direction={{ xs: "column-reverse", md: "row" }}
            alignItems={{ xs: "unset", md: "center" }}
            gap={{ xs: 3, md: 1 }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <Box
                width={40}
                component="img"
                src={post.user.profile_photo_thumbnail_link}
                sx={{
                  borderRadius: "100%",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              />
              <Stack gap={0.5}>
                <Typography sx={{ color: "white", opacity: 0.8 }} variant="h4">
                  {post.user.username}
                </Typography>
                <Typography variant="h5" sx={{ color: "white", opacity: 0.8 }}>
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
                  color: colorByNumberValue(values.roi),
                  fontSize: { xs: 34, md: 52 },
                  display: "flex",
                  alignItems: "center",
                  ">div": {
                    fontSize: { xs: 34, md: 52 },
                  },
                }}
                variant="h1"
              >
                {values.roi > 0 && "+"}
                {values.price && (
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={values.roi}
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
                      : {post.finished ? post.hit_price : values.price}
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
                      : {translate("component.post_card.status." + post.status)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </Stack>
      </Stack>
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
          disabled={imgLoading}
          loading={loading}
          onClick={downloadImage}
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
