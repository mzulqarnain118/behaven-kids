import React from "react";
import { Tabs, Tab } from "@mui/material";

interface ResponsiveTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({
  value,
  handleChange,
}) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        backgroundColor: "#f5f5f5",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        ".MuiTab-root": {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "16px",
          color: "#555",
          "&:hover": {
            color: "#1976d2",
            backgroundColor: "#e3f2fd",
          },
          "&.Mui-selected": {
            color: "#fff",
            backgroundColor: "#1976d2",
            borderRadius: "4px",
            transition: "background-color 0.3s ease",
          },
        },
        ".MuiTabs-indicator": {
          height: "4px",
          backgroundColor: "#1976d2",
        },
      }}
    >
      <Tab label="Profile" />
      <Tab label="ABA" />
      <Tab label="SDP" />
      <Tab label="Therapy" />
      <Tab label="Clinic" />
      <Tab label="Insurance" />
      <Tab label="Treatment" />
      <Tab label="Appointments" />
      <Tab label="TableData" />
    </Tabs>
  );
};

export default ResponsiveTabs;
