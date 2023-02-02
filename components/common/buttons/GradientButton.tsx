import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";

interface IGradientButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  onClick?: () => void;
}

const GradientButton: React.FC<IGradientButtonProps> = ({
  type = "button",
  text,
  size,
  loading = false,
  onClick,
}) => {
  return (
    <>
      {loading ? (
        <LoadingButton
          size={size}
          loading
          loadingPosition="start"
          startIcon={<LoginIcon />}
          variant="outlined"
        >
          Loading...
        </LoadingButton>
      ) : (
        <Button size={size} variant={"contained"} type={type} onClick={onClick}>
          {text}
        </Button>
      )}
    </>
  );
};

export default GradientButton;
