import { Typography, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";

import MuiIcon from "./MuiIcon";

const MenuList = ({
  items,
  onClose,
  className,
  children,
  color,
  icon,
  tooltip,
}: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = (item: any, event: any) => {
    onClose(item);
    setAnchorEl(null);
    event.stopPropagation();
  };

  return (
    <>
      <Tooltip title={tooltip}>
        <MuiIcon name={icon} onClick={handleOpen} color={color} />
      </Tooltip>

      <Menu
        sx={{
          mt: "45px",
          right: 0,
          ...className,
        }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={(event) => handleClose(null, event)} // Pass null as the default value
      >
        {children}
        {items.map((item: any) =>
          typeof item === "string" ? (
            <MenuItem key={item} onClick={(event) => handleClose(item, event)}>
              <Typography textAlign="center">{item}</Typography>
            </MenuItem>
          ) : (
            <MenuItem
              key={item?.label}
              onClick={(event) => handleClose(item?.label, event)}
            >
              <MuiIcon name={item?.icon} />
              <Typography textAlign="center">{item?.label}</Typography>
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
};

export default MenuList;
