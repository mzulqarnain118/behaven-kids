import {useState} from 'react'
import ResponsiveTabs from './ResponsiveTabs';
import {Typography,Box,Grid,Button} from '@mui/material'
import ClientProfile from './ClientProfile';
import PersonalInfo from './PersonalInfo';
import Insurance from './Insurance';
import Treatment from './Treatment';
import Appointment from './Appointment';


function index() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event:any, newValue:any) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
    <Typography variant="h4" gutterBottom>Client Profile</Typography>
    
    <ResponsiveTabs value={tabValue} handleChange={handleTabChange} />

    {tabValue===0 && <ClientProfile/>}
    {tabValue===1 && <PersonalInfo/>}
    {tabValue===2 && <Insurance/>}
    {tabValue===3 && <Treatment/>}
    {tabValue===4 && <Appointment/>}

    <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" disabled={tabValue===0} onClick={()=>setTabValue(old=>old-1)}>Previous</Button>
              <Button variant="contained" disabled={tabValue===4} onClick={()=>setTabValue(old=>old+1)}>Next</Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
        <Button variant="contained" color="primary" style={{marginTop:10, float:'right' }}>Submit</Button>
        </Grid>
    </Box>
  )
}

export default index;
