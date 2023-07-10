import { Divider, Stack, Typography } from "@mui/material";
import { WrappedModal } from "../../../components/shared/common/wrappedModal";
import { useTranslate } from "../../../hooks/useTranslate";

export const FindBUIDModal = ({ onClose }: { onClose: () => void }) => {
  const translate = useTranslate();

  return (
    <WrappedModal opened={true} onClose={onClose}>
      <Stack spacing={2} my={3}>
        <Typography variant="h2">
          {translate("page.be_moniest.get_binance_id.title")}
        </Typography>
        <Typography variant="body2">
          {translate("page.be_moniest.get_binance_id.description")}
        </Typography>
        <Divider />
        <Typography variant="h3">
          {translate("page.be_moniest.get_binance_id.on_app.title")}
        </Typography>
        <Typography variant="body2">
          {translate("page.be_moniest.get_binance_id.on_app.desc")}
        </Typography>

        <img
          width="65%"
          height="100%"
          alt="binance-get-uid-mobile"
          referrerPolicy="no-referrer"
          src="https://public.bnbstatic.com/image/cms/content/body/202202/749d00d2b5be8010d079ba039b619ca4.png"
        />
        <Divider />
        <Typography variant="h3">
          {translate("page.be_moniest.get_binance_id.on_website.title")}
        </Typography>
        <Typography variant="body2">
          {translate("page.be_moniest.get_binance_id.on_website.desc")}
        </Typography>

        <img
          width="100%"
          height="100%"
          alt="binance-get-uid-desktop-1"
          referrerPolicy="no-referrer"
          src="https://public.bnbstatic.com/image/cms/content/body/202202/471476b2bdb3bf9412c9e0e9efbb2e8a.png"
        />
        <img
          width="100%"
          height="100%"
          alt="binance-get-uid-desktop-2"
          referrerPolicy="no-referrer"
          src="https://public.bnbstatic.com/image/cms/content/body/202202/66fc5aaf996b011cdffd01fe78aa5f08.png"
        />
      </Stack>
    </WrappedModal>
  );
};
