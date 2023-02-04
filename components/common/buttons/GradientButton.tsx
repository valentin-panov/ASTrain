import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import styles from "./Button.module.scss";

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
          className={styles.btn}
        >
          Loading...
        </LoadingButton>
      ) : (
        <Button
          size={size}
          variant={"contained"}
          type={type}
          onClick={onClick}
          className={`${styles.btn} ${styles.btn_gradient}`}
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default GradientButton;
