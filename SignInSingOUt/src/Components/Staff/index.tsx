import { useState } from "react";
import ResponsiveTabs from "./ResponsiveTabs";
import { Typography, Box, Grid, Button } from "@mui/material";
import StaffProfile from "./StaffProfile";
import StaffLocations from "./StaffLoctions";
import useStore from "./store/useStore";

function index() {
  const { tabValue, formData, setTabValue, setSelectedRowId } = useStore();

  console.log("🚀 ~ index ~ formData:", formData);

  const handleTabChange = (event: any, newValue: any, rowId = 0) => {
    setTabValue(newValue);
    setSelectedRowId(rowId);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Client Profile
      </Typography>

      <ResponsiveTabs value={tabValue} handleChange={handleTabChange} />

      {tabValue === 0 && <StaffProfile handleTabChange={handleTabChange} />}
      {tabValue === 1 && <StaffLocations />}

      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            disabled={tabValue === 0}
            onClick={() => setTabValue(tabValue - 1)}
            sx={{ marginTop: 5 }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={tabValue === 1}
            onClick={() => setTabValue(tabValue + 1)}
            sx={{ marginTop: 5 }}
          >
            Next
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10, marginBottom: 10, float: "right" }}
          fullWidth
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
}

export default index;
