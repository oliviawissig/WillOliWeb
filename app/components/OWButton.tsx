import { Button, Icon } from "@mui/material";
import { ReactNode } from "react";

interface OWButtonProps {
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children?: ReactNode;
  startIcon?: ReactNode;
}

export default function OWButton(props: OWButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      startIcon={props.startIcon || <Icon />}
      sx={{
        backgroundColor: "var(--brand-color)",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#87659c",
        },
      }}
    >
      {props.children}
    </Button>
  );
}
