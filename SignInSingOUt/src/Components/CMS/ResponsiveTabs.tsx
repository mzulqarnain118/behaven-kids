import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface ResponsiveTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({ value, handleChange }) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
    >
      <Tab label="Dashboard" />
      <Tab label="Personal Info" />
      <Tab label="Insurance" />
      <Tab label="Treatment" />
      <Tab label="Appointments" />
    </Tabs>
  );
}

export default ResponsiveTabs;
