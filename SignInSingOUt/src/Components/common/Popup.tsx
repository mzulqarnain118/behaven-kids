import React from "react";
import {
  DialogTitle,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import Controls from ".";
import MuiIcon from "./MuiIcon";

// Using @mui/system's styled API for custom styles
const DialogWrapper = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(2),
  position: "absolute",
}));

const RootBox = styled(Box)(({ theme }) => ({
  minWidth: 0,
  margin: theme.spacing(0.5),
}));

export default function Popup({
  width,
  title,
  setPopups,
  subTitle,
  children,
  openPopup,
  setPopup,
  submitBtnLabel,
  cancelBtnLabel,
  submitHandler,
  handlePopupCancel,
  popupName,
  onClose,
}: any) {
  return (
    <RootBox sx={{ position: "relative" }}>
      <DialogWrapper fullWidth maxWidth={width ?? "md"} open={openPopup}>
        <DialogTitle>
          {submitBtnLabel === "Confirm" ? (
            <Typography variant="h5">{title ?? "Are you sure?"}</Typography>
          ) : (
            <>
              <div className="row-between">
                <Typography variant="h5" align="left">
                  {title}
                </Typography>
                <MuiIcon
                  onClick={() => {
                    setPopup && setPopup(!openPopup);
                    onClose && onClose();
                    setPopups &&
                      popupName &&
                      setPopups((prev) => ({ ...prev, [popupName]: false }));
                  }}
                  name="Close"
                />
              </div>
              <Typography align="left" sx={{ color: "customColors.subtitle1" }}>
                {subTitle}
              </Typography>
            </>
          )}
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "80vh", overflowY: "auto" }}>
          {children}
        </DialogContent>
        {submitBtnLabel && (
          <DialogActions className="row-between">
            {(cancelBtnLabel || submitBtnLabel === "Confirm") && (
              <Controls.MuiButton
                className="child"
                type="button"
                size={"large"}
                onClick={() => {
                  handlePopupCancel && handlePopupCancel();
                  setPopup && setPopup(!openPopup);
                  setPopups &&
                    popupName &&
                    setPopups((prev) => ({ ...prev, [popupName]: false }));
                }}
                variant="outlined"
                label={cancelBtnLabel ?? "Cancel"}
              />
            )}
            <Controls.MuiButton
              className="child"
              size={submitBtnLabel === "Confirm" ? "large" : "md"}
              onClick={() => {
                submitHandler && submitHandler();
                setPopup && setPopup(!openPopup);
                setPopups &&
                  popupName &&
                  setPopups((prev) => ({ ...prev, [popupName]: false }));
              }}
              variant={submitBtnLabel === "Confirm" ? "outlined" : "contained"}
              label={submitBtnLabel}
            />
          </DialogActions>
        )}
      </DialogWrapper>
    </RootBox>
  );
}
