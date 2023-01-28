import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface IButton {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  loading: boolean;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
}

const MainButton: React.FC<IButton> = ({
  type = "button",
  text,
  loading,
  onClick,
  size,
  variant = "contained",
}) => (
  <>
    {loading ? (
      <LoadingButton
        loading
        loadingPosition="start"
        variant={variant}
        size={size}
      >
        Loading...
      </LoadingButton>
    ) : (
      <Button variant={variant} type={type} onClick={onClick} size={size}>
        {text}
      </Button>
    )}
  </>
);

export default MainButton;
