import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface IButton {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  loading: boolean;
}

const MainButton: React.FC<IButton> = ({ type = "button", text, loading }) => (
  <>
    {loading ? (
      <LoadingButton loading loadingPosition="start" variant="outlined">
        Loading...
      </LoadingButton>
    ) : (
      <Button variant={"contained"} type={type}>
        {text}
      </Button>
    )}
  </>
);

export default MainButton;
