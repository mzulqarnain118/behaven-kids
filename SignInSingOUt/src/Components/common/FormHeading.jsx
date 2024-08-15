import { Typography } from "@mui/material";

export default function FormHeading({ className, heading, title }) {
  return (
    <>
      <Typography className={className}>{heading}</Typography>
      {title && <span className={classes.title}>{title}</span>}
    </>
  );
}
