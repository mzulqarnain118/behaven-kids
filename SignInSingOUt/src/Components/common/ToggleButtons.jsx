import * as React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";

export default function ToggleButtons({ setView, view }) {
  const handleChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <Box
      sx={{
        padding: "4px",
        background: "var(--petroleum-p-15, #E9EDF0)",
        borderRadius: "8px",
      }}
    >
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}
        sx={{ border: "none" }}
      >
        <ToggleButton
          sx={{
            border: "none",
            "&.Mui-selected": {
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "white", // Remove hover effect
              },
            },
            "&:hover": {
              backgroundColor: "initial", // Remove hover effect
            },
          }}
          value="list"
          aria-label="list"
        >
          <MenuRoundedIcon />
        </ToggleButton>
        <ToggleButton
          sx={{
            border: "none",
            "&.Mui-selected": {
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "white", // Remove hover effect
              },
            },
            "&:hover": {
              backgroundColor: "initial", // Remove hover effect
            },
          }}
          value="module"
          aria-label="module"
        >
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
