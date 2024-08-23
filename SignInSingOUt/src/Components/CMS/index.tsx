import ResponsiveTabs from "./ResponsiveTabs";
import { Typography, Box, Grid, Button } from "@mui/material";
import ClientProfile from "./ClientProfile";
import GuardianInfo from "./GuardianInfo";
import Insurance from "./Insurance";
import Treatment from "./Treatment";
import Appointment from "./Appointment";
import AuthorizedParty from "./AuthorizedParty";
import useStore from "./store/useStore";
import PrimaryDoctor from "./PrimaryDoctor";
import Controls from "../common";
import ABA from "./ABA";
import SDP from "./SDP";
import Therapy from "./Therapy";
import Clinic from "./Clinic";
import TableData from "./TableData";

function index() {
  const {
    tabValue,
    formData,
    setTabValue,
    popupState,
    handlePopup,
    setSelectedRowId,
  } = useStore();
  const components = {
    responsible: <GuardianInfo />,
    authorized: <AuthorizedParty />,
    doctor: <PrimaryDoctor />,
    client: <ClientProfile />,
  };
  console.log("🚀 ~ index ~ formData:", formData, popupState);

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

      {tabValue === 0 && <ClientProfile />}
      {tabValue === 1 && <ABA />}
      {tabValue === 2 && <SDP />}
      {tabValue === 3 && <Therapy />}
      {tabValue === 4 && <Clinic />}
      {tabValue === 5 && <Insurance />}
      {tabValue === 6 && <Treatment />}
      {tabValue === 7 && <Appointment />}
      {tabValue === 8 && <TableData />}

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
            disabled={tabValue === 8}
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
      {popupState?.isOpen && (
        <Controls.Popup
          openPopup={popupState?.isOpen}
          setPopup={() => handlePopup(false)}
          width={"lg"}
          title={popupState?.title}
        >
          {components[popupState?.slug]}
        </Controls.Popup>
      )}
    </Box>
  );
}

export default index;
