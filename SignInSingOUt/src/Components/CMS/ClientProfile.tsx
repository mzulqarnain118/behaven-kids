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
import { clientProfileSchema } from "./validation";

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
    resolver: yupResolver(clientProfileSchema),
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    fullWidth
                    label="First Name"
                    {...field}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    fullWidth
                    label="Last Name"
                    {...field}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
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
                name="ssn"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="SSN"
                    {...field}
                    error={!!errors.ssn}
                    helperText={errors.ssn?.message}
                  />
                )}
              />
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
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Select Status</InputLabel>
                    <Select
                      label="Select Status"
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
                <Typography color="error">{errors.status.message}</Typography>
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
            </Grid>
          </Grid>

           {/* Responsible Party Section  */}
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">
                  Responsible Party (Parents/Guardians)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => addResponsibleParty({
                      firstName: "",
                      lastName: "",
                      relationship: "",
                    })
                  }
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {formData?.responsibleParties?.map((item, index) => (
              <Grid container spacing={2} sx={{ mt: 1 }} key={item.id}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled
                    fullWidth
                    label="First Name"
                    value={item?.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled
                    fullWidth
                    label="Last Name"
                    value={item?.lastName}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Select
                    disabled
                    label="Relationship"
                    value={item?.relationship}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ height: "56px" }}
                    onClick={(e) => handleTabChange(e, 1, index)}
                  >
                    Profile
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Box>
          {/* Authorized Party Section  */}
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Authorized Party</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>  addAuthorizedParty({
                      firstName: "",
                      phone: "",
                      email: "",
                    })
                  }
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {formData?.authorizedParties?.map((item, index) => (
              <Grid container spacing={2} sx={{ mt: 1 }} key={index}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled
                    fullWidth
                    label="First Name"
                    value={item?.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled
                    fullWidth
                    label="Phone"
                    value={item?.phone}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled
                    fullWidth
                    label="Email"
                    value={item?.email}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ height: "56px" }}
                    onClick={(e) => handleTabChange(e, 2, index)}
                  >
                    Profile
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Box>

          {/* Emergency Contact Section  */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Emergency Contact</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="emergencyFirstName1"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      fullWidth
                      label="First Name"
                      {...field}
                      error={!!errors.emergencyFirstName1}
                      helperText={errors.emergencyFirstName1?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="emergencyPhone1"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Phone"
                      {...field}
                      error={!!errors.emergencyPhone1}
                      helperText={errors.emergencyPhone1?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="emergencyEmail1"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="email"
                      fullWidth
                      label="Email"
                      {...field}
                      error={!!errors.emergencyEmail1}
                      helperText={errors.emergencyEmail1?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="emergencyFirstName2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      fullWidth
                      label="First Name"
                      {...field}
                      error={!!errors.emergencyFirstName2}
                      helperText={errors.emergencyFirstName2?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="emergencyPhone2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Phone"
                      {...field}
                      error={!!errors.emergencyPhone2}
                      helperText={errors.emergencyPhone2?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="emergencyEmail2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="email"
                      fullWidth
                      label="Email"
                      {...field}
                      error={!!errors.doctorEmail2}
                      helperText={errors.doctorEmail2?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Primary Doctor's Contact Section  */}
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Primary Doctor's Contact</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => addDoctor({
                      firstName: "",
                      lastName: "",
                      email: "",
                      clinicName: "",
                      clinicWebsite: "",
                      clinicPhone: "",
                    })
                  
                  }
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {formData?.doctors?.map((item, index) => (
              <Grid container spacing={2} sx={{ mt: 1 }} key={index}>
                <Grid item xs={12} sm={4}>
                <TextField
                    disabled
                    fullWidth
                    label="First Name"
                    value={item?.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                <TextField
                    disabled
                    fullWidth
                    label="Last Name"
                    value={item?.lastName}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>

                <TextField
                    disabled
                    fullWidth
                    label="Email"
                    value={item?.email}
                  />
                </Grid>

                 {/* Additional fields for clinic details  */}
                <Grid item xs={12} sm={4}>

                <TextField
                    disabled
                    fullWidth
                    label="Clinic Name"
                    value={item?.clinicName}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                <TextField
                    disabled
                    fullWidth
                    label="Website"
                    value={item?.clinicWebsite}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>

                <TextField
                    disabled
                    fullWidth
                    label="Phone"
                    value={item?.clinicPhone}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ height: "56px", textAlign: "right" }}
                    onClick={(e) => handleTabChange(e, 3, index)}
                  >
                    Profile
                  </Button>
                </Grid>
              </Grid>
            ))}
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

export default ClientProfile;

