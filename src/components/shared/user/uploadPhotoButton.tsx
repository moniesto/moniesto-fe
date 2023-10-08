import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import { ChangeEvent, useCallback } from "react";
import imageService from "../../../services/imageService";
import toastService from "../../../services/toastService";
import { useTranslate } from "../../../hooks/useTranslate";

type propTypes = {
  loading: boolean;
  handleLoading: (isLoading: boolean) => void;
  handleBase64Image: (imageData: string) => void;
};

export const UploadPhotoButton = ({
  handleLoading,
  loading,
  handleBase64Image,
}: propTypes) => {
  const theme = useTheme();
  const translate = useTranslate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleChangeFile(event.target.files[0]);
    }
  };

  const handleChangeFile = useCallback(
    (file: File) => {
      //8 MB MAX
      const maxAllowedSize = 8 * 1024 * 1024;
      if (file.size > maxAllowedSize) {
        toastService.open({
          message: translate("component.image_upload.exceed", { value: 8 }),
          severity: "error",
        });
        return;
      }

      handleLoading(true);
      imageService
        .getBase64(file)
        .then((base64Data) => {
          setTimeout(() => {
            handleBase64Image(base64Data as string);
          }, 2000);
        })
        .finally(() =>
          setTimeout(() => {
            handleLoading(false);
          }, 2000)
        );
    },
    [handleBase64Image, handleLoading, translate]
  );

  return (
    <IconButton
      disabled={loading}
      color="primary"
      component="label"
      sx={{
        border: `2px solid ${theme.palette.background[800]}`,
        backgroundColor: theme.palette.background[600],
        width: "35px",
        height: "35px",
        ">svg": {
          fontSize: "1rem",
        },
        "&:hover": {
          backgroundColor: theme.palette.background[800],
        },
      }}
    >
      <input onChange={handleFileChange} hidden accept="image/*" type="file" />
      <AddPhotoAlternateOutlined />
    </IconButton>
  );
};
