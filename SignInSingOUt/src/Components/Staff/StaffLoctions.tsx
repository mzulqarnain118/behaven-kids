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
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useStore from "./store/useStore";
import { staffLocationSchema } from "./validation";

interface ClientProfileProps {
  handleTabChange: (
    event: React.SyntheticEvent,
    newValue: number,
    rowId: number
  ) => void;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ handleTabChange }) => {
  const { formData, setFormData, addAuthorizedParty, addDoctor,addResponsibleParty } = useStore();
  console.log(formData,"fromDaraaa")

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(staffLocationSchema),
  });


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
                    name="deportment"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Deportment</InputLabel>
                        <Select
                          label="Deportment"
                          labelId="status-label"
                          fullWidth
                          {...field}
                          error={!!errors.status}
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
                  {errors.status && (
                    <Typography color="error">{errors.deportment.message}</Typography>
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
                    error={!!errors.dob}
                    helperText={errors.eventDate?.message}
                  />
                )}
              />
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
                                error={!!errors.status}
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
                        {errors.status && (
                          <Typography color="error">{errors.role.message}</Typography>
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
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="Event-label">Event</InputLabel>
                        <Select
                          label="Event"
                          labelId="Event-label"
                          fullWidth
                          {...field}
                          error={!!errors.status}
                        >
                          <MenuItem value="" disabled>
                            Select Status
                          </MenuItem>
                          <MenuItem >Termination</MenuItem>
                          <MenuItem >Role Change</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  {errors.status && (
                    <Typography color="error">{errors.role.message}</Typography>
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
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                  />
                )}
              />
            </Grid>
             <Grid item xs={12} sm={6}>
                  <Grid item xs={12} sm={12}>
                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => (
                            <FormControl fullWidth>
                              <InputLabel id="status-label">Location</InputLabel>
                              <Select
                                label="Location"
                                labelId="status-label"
                                fullWidth
                                {...field}
                                error={!!errors.status}
                              >
                                <MenuItem value="" disabled>
                                  Select Status
                                </MenuItem>
                                <MenuItem >USA</MenuItem>
                                <MenuItem >London</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        />
                        {errors.status && (
                          <Typography color="error">{errors.status.message}</Typography>
                        )}
                  </Grid>
                  </Grid>
            </Grid>

          </Box>

          {/* Authorized Party Section  */}
          

          {/* Emergency Contact Section  */}
          

          {/* Primary Doctor's Contact Section  */}
         
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

export default ClientProfile;

