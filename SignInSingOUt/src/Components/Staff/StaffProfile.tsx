import React from "react";
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  CardContent,
  Card,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useStore from "./store/useStore";
import { staffProfileSchema } from "./validation";
import Controls from "../common";

interface StaffProfileProps {
  handleTabChange: (
    event: React.SyntheticEvent,
    newValue: number,
    rowId: number
  ) => void;
}

const StaffProfile: React.FC<StaffProfileProps> = ({ handleTabChange }) => {
  const { formData, setFormData} = useStore();
  console.log(formData,"fromDaraaa")

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(staffProfileSchema),
  });

console.log(formData)
  const onSubmit = (data: any) => {
    setFormData(data);
    // You can also handle form submission here, e.g., send data to an API
    console.log("Form submitted:", data);
  };

  return (
    <Card>
      <CardContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ p: 2 }}
        >
           {/* Main Client Information  */}
           <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controls.ControlledInput
                name="firstName"
                control={control}
                errors={errors}
                label="First Name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controls.ControlledInput
                name="lastName"
                control={control}
                errors={errors}
                label="Last Name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...field}
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Select Gender</InputLabel>
                    <Select
                      label="Select Gender"
                      labelId="gender-label"
                      fullWidth
                      {...field}
                      error={!!errors.gender}
                    >
                      <MenuItem value="" disabled>
                        Select Gender
                      </MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.gender && (
                <Typography color="error">{errors.gender.message}</Typography>
              )}
            </Grid>

         

            <Grid item xs={12} sm={6}>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Code"
                    {...field}
                    error={!!errors.code}
                    helperText={errors.code?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="martial-label">
                      Select Marital Status
                    </InputLabel>
                    <Select
                      labelId="martial-label"
                      fullWidth
                      {...field}
                      error={!!errors.maritalStatus}
                      label="Select Marital Status"
                    >
                      <MenuItem value="" disabled>
                        Select Marital Status
                      </MenuItem>
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Divorced">Divorced</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.maritalStatus && (
                <Typography color="error">
                  {errors.maritalStatus.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="activeStatus"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Select Status</InputLabel>
                    <Select
                      label="Select Status"
                      labelId="status-label"
                      fullWidth
                      {...field}
                      error={!!errors.activeStatus}
                    >
                      <MenuItem value="" disabled>
                        Select Status
                      </MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.activeStatus && (
                <Typography color="error">{errors.activeStatus.message}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="address1"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Address 1"
                    {...field}
                    error={!!errors.address1}
                    helperText={errors.address1?.message}
                  />
                )}
              />
                {errors.address1 && (
                    <Typography color="error">
                      {errors.address1.message}
                    </Typography>
                  )}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="address2"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Address 2"
                    {...field}
                    error={!!errors.address2}
                    helperText={errors.address2?.message}
                  />
                )}
              />
                {errors.address2 && (
                    <Typography color="error">
                      {errors.address2.message}
                    </Typography>
                  )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    fullWidth
                    label="City"
                    {...field}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
                {errors.city && (
                    <Typography color="error">
                      {errors.city.message}
                    </Typography>
                  )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="State"
                    {...field}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                )}
              />
                {errors.state && (
                    <Typography color="error">
                      {errors.state.message}
                    </Typography>
                  )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Zip Code"
                    {...field}
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                  />
                )}
              />
                {errors.zipCode && (
                    <Typography color="error">
                      {errors.zipCode.message}
                    </Typography>
                  )}
            </Grid>
          </Grid>

           {/* Role Section  */}
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">
                  Role:
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12} sm={12}>
                  <Controller
                    name="department"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Department</InputLabel>
                        <Select
                          label="Department"
                          labelId="status-label"
                          fullWidth
                          {...field}
                          error={!!errors.department}
                        >
                          <MenuItem value="" disabled>
                            Select Status
                          </MenuItem>
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                    {errors.department && (
                    <Typography color="error">
                      {errors.department.message}
                    </Typography>
                  )}
                </Grid>
             </Grid>
             <Grid item xs={12} sm={6}>
              <Controller
                name="roleDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Role Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...field}
                    error={!!errors.dob}
                    helperText={errors.roleDate?.message}
                  />
                )}
              />
                {errors.roleDate && (
                    <Typography color="error">
                      {errors.roleDate.message}
                    </Typography>
                  )}
            </Grid>
             <Grid item xs={12} sm={6}>
                  <Grid item xs={12} sm={12}>
                        <Controller
                          name="role"
                          control={control}
                          render={({ field }) => (
                            <FormControl fullWidth>
                              <InputLabel id="status-label">Role</InputLabel>
                              <Select
                                label=" Role"
                                labelId="status-label"
                                fullWidth
                                {...field}
                                error={!!errors.role}
                              >
                                <MenuItem value="" disabled>
                                  Select Role
                                </MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        />
                        {errors.role && (
                    <Typography color="error">
                      {errors.role.message}
                    </Typography>
                  )}
                  </Grid>
                  </Grid>
            </Grid>

          </Box>
            {/* Event Section  */}
            <Box sx={{ mt: 4 }}>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">
                  Events:
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12} sm={12}>
                  <Controller
                    name="selectEvent"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Event</InputLabel>
                        <Select
                          label="Department"
                          labelId="status-label"
                          fullWidth
                          {...field}
                          error={!!errors.selectEvent}
                        >
                          <MenuItem value="" disabled>
                            Select Status
                          </MenuItem>
                          <MenuItem value="Active">terminate</MenuItem>
                          <MenuItem value="Inactive">role</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  {errors.selectEvent && (
                    <Typography color="error">{errors.selectEvent.message}</Typography>
                  )}
                </Grid>
             </Grid>
             <Grid item xs={12} sm={6}>
              <Controller
                name="eventDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Event Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...field}
                    error={!!errors.dob}
                    helperText={errors.eventDate?.message}
                  />
                )}
              />
            </Grid>
             <Grid item xs={12} sm={6}>
                  <Grid item xs={12} sm={12}>
                  <Controller
                    name="eventLocation"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Loaction</InputLabel>
                        <Select
                          label="Department"
                          labelId="status-label"
                          fullWidth
                          {...field}
                          error={!!errors.eventLocation}
                        >
                          <MenuItem value="" disabled>
                            Select Status
                          </MenuItem>
                          <MenuItem value="Active">London</MenuItem>
                          <MenuItem value="Inactive">USA</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                        {errors.eventLocation && (
                          <Typography color="error">{errors.eventLocation.message}</Typography>
                        )}
                  </Grid>
                  </Grid>
            </Grid>

          </Box>
         
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ my: "1rem", float: "right" }}
            >
              Save
            </Button>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StaffProfile;

