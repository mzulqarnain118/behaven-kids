import { Button } from "@mui/material";
import Controls from ".";

export default function MuiButton({
  className,
  label,
  endIcon,
  startIcon,
  disabled,
  children,
  variant,
  size,
  bgcolor,
  color,
  onClick,
  startCustomIcon,
  endCustomIcon,
  minWidth,
  ...other
}: any) {
  return (
    <Button
      variant={variant ?? "outlined"}
      label={label}
      size={size ?? "small"}
      disabled={disabled}
      className={className}
      onClick={onClick}
      startIcon={
        startCustomIcon ? <Controls.Img src={startCustomIcon} /> : startIcon
      }
      endIcon={endCustomIcon ? <Controls.Img src={endCustomIcon} /> : endIcon}
      sx={{
        backgroundColor: bgcolor && `${bgcolor}`,
        textTransform: "none",
        color: color,
        minWidth: minWidth,
      }}
      {...other}
    >
      {label}
      {children}
    </Button>
  );
}
