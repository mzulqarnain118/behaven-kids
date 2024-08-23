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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useStore from "./store/useStore";
import { staffLocationSchema } from "./validation"; // Import the validation schema

interface StaffLocationProps {
  handleTabChange: (
    event: React.SyntheticEvent,
    newValue: number,
    rowId: number
  ) => void;
}

const StaffLocation: React.FC<StaffLocationProps> = ({ handleTabChange }) => {
  const { formData, setFormData } = useStore();
  console.log(formData, "fromDaraaa");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(staffLocationSchema), // Apply the validation schema
  });

  const onSubmit = (data: any) => {
    setFormData(data);
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
          {/* Main Client Information */}

          {/* Role Section */}
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Role:</Typography>
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
                            Select Department
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
                  name="eventdate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Event Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      error={!!errors.eventdate}
                      
                    />
                  )}
                />
                {errors.eventdate && (
                    <Typography color="error">
                      {errors.eventdate.message}
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
                          label="Role"
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
                    <Typography color="error">{errors.role.message}</Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Event Section */}
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Events:</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="eventStatus"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="Event-label">Event</InputLabel>
                        <Select
                          label="Event"
                          labelId="Event-label"
                          fullWidth
                          {...field}
                          error={!!errors.eventStatus}
                        >
                          <MenuItem value="" disabled>
                            Select Event
                          </MenuItem>
                          <MenuItem value="Termination">Termination</MenuItem>
                          <MenuItem value="Role Change">Role Change</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  {errors.eventStatus && (
                    <Typography color="error">
                      {errors.eventStatus.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Event Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      error={!!errors.date}
                      
                    />
                  )}
                />
                 {errors.date && (
                    <Typography color="error">
                      {errors.date.message}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Location</InputLabel>
                        <Select
                          label="Location"
                          labelId="status-label"
                          fullWidth
                          {...field}
                          error={!!errors.location}
                        >
                          <MenuItem value="" disabled>
                            Select Location
                          </MenuItem>
                          <MenuItem value="USA">USA</MenuItem>
                          <MenuItem value="London">London</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  {errors.location && (
                    <Typography color="error">
                      {errors.location.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Save Button */}
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

export default StaffLocation;
