import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import React from "react";

export default function Checkbox({
  register,
  checked,
  label,
  size,
  ...others
}) {
  return (
    <FormControlLabel
      control={
        checked ? (
          <MuiCheckbox checked={checked} size={size ?? "large"} />
        ) : (
          <MuiCheckbox {...register} size={size ?? "large"} />
        )
      }
      label={label}
      {...others}
    />
  );
}
