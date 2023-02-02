import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import styles from "./Button.module.scss";

interface IButton {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  loading: boolean;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  rounded?: boolean;
}

const MainButton: React.FC<IButton> = ({
  type = "button",
  text,
  loading,
  onClick,
  size,
  variant = "outlined",
  rounded = false,
}) => (
  <>
    {loading ? (
      <LoadingButton
        loading
        loadingPosition="start"
        variant={variant}
        size={size}
        startIcon={<LoginIcon />}
        className={rounded ? styles.rounded_full : ""}
      >
        <span>Loading...</span>
      </LoadingButton>
    ) : (
      <Button
        variant={variant}
        type={type}
        onClick={onClick}
        size={size}
        className={rounded ? styles.rounded_full : ""}
      >
        {text}
      </Button>
    )}
  </>
);

export default MainButton;
