import React from 'react';
import { Grid, Box, Button, TextField, Typography, Select, MenuItem } from '@mui/material';
import useStore from './store/useStore';

function ClientProfile() {
  const { formData, setFormData } = useStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ [name as string]: value });
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Client Profile</Typography>
      
      {/* Main Client Information */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="First Name" name="firstName" onChange={handleInputChange} value={formData.firstName || ''} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Last Name" name="lastName" onChange={handleInputChange} value={formData.lastName || ''} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Date of Birth" name="dob" onChange={handleInputChange} value={formData.dob || ''} type="date" InputLabelProps={{ shrink: true }} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select fullWidth name="gender" value={formData.gender || ''} onChange={handleInputChange}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="SSN" name="ssn" onChange={handleInputChange} value={formData.ssn || ''} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Code" name="code" onChange={handleInputChange} value={formData.code || ''} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select fullWidth name="maritalStatus" value={formData.maritalStatus || ''} onChange={handleInputChange}>
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Divorced">Divorced</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select fullWidth name="status" value={formData.status || ''} onChange={handleInputChange}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="Address 1" name="address1" onChange={handleInputChange} value={formData.address1 || ''} />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="Address 2" name="address2" onChange={handleInputChange} value={formData.address2 || ''} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="City" name="city" onChange={handleInputChange} value={formData.city || ''} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="State" name="state" onChange={handleInputChange} value={formData.state || ''} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Zip Code" name="zipCode" onChange={handleInputChange} value={formData.zipCode || ''} />
        </Grid>
      </Grid>

      {/* Responsible Party Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Responsible Party (Parents/Guardians)</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name" name="respFirstName1" onChange={handleInputChange} value={formData.respFirstName1 || ''} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" name="respLastName1" onChange={handleInputChange} value={formData.respLastName1 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Select fullWidth name="respLevel1" value={formData.respLevel1 || ''} onChange={handleInputChange}>
              <MenuItem value="Primary">Primary</MenuItem>
              <MenuItem value="Secondary">Secondary</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Button variant="contained" fullWidth>Add</Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name" name="respFirstName2" onChange={handleInputChange} value={formData.respFirstName2 || ''} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" name="respLastName2" onChange={handleInputChange} value={formData.respLastName2 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Select fullWidth name="respLevel2" value={formData.respLevel2 || ''} onChange={handleInputChange}>
              <MenuItem value="Primary">Primary</MenuItem>
              <MenuItem value="Secondary">Secondary</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Button variant="contained" fullWidth>Profile</Button>
          </Grid>
        </Grid>
      </Box>

      {/* Authorized Party Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Authorized Party</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="First Name" name="authFirstName1" onChange={handleInputChange} value={formData.authFirstName1 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Phone" name="authPhone1" onChange={handleInputChange} value={formData.authPhone1 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Email" name="authEmail1" onChange={handleInputChange} value={formData.authEmail1 || ''} />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" fullWidth>Add</Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="First Name" name="authFirstName2" onChange={handleInputChange} value={formData.authFirstName2 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Phone" name="authPhone2" onChange={handleInputChange} value={formData.authPhone2 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Email" name="authEmail2" onChange={handleInputChange} value={formData.authEmail2 || ''} />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" fullWidth>Profile</Button>
          </Grid>
        </Grid>
      </Box>

      {/* Emergency Contact Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Emergency Contact</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="First Name" name="emergencyFirstName1" onChange={handleInputChange} value={formData.emergencyFirstName1 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Phone" name="emergencyPhone1" onChange={handleInputChange} value={formData.emergencyPhone1 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Email" name="emergencyEmail1" onChange={handleInputChange} value={formData.emergencyEmail1 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="First Name" name="emergencyFirstName2" onChange={handleInputChange} value={formData.emergencyFirstName2 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Phone" name="emergencyPhone2" onChange={handleInputChange} value={formData.emergencyPhone2 || ''} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Email" name="emergencyEmail2" onChange={handleInputChange} value={formData.emergencyEmail2 || ''} />
          </Grid>
        </Grid>
      </Box>

      {/* Primary Doctor's Contact Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Primary Doctor's Contact</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name" name="doctorFirstName" onChange={handleInputChange} value={formData.doctorFirstName || ''} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" name="doctorLastName" onChange={handleInputChange} value={formData.doctorLastName || ''} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="doctorEmail" onChange={handleInputChange} value={formData.doctorEmail || ''} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Clinic Name" name="clinicName" onChange={handleInputChange} value={formData.clinicName || ''} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Website" name="clinicWebsite" onChange={handleInputChange} value={formData.clinicWebsite || ''} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone" name="clinicPhone" onChange={handleInputChange} value={formData.clinicPhone || ''} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth>Add</Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth>Profile</Button>
          </Grid>
        </Grid>
      </Box>


    </Box>
  );
}

export default ClientProfile;
