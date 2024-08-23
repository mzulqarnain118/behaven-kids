import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CardContent,
  Card,
  FormControl,
  InputLabel,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import useStore from "./store/useStore";
import { guardianSchema } from "./validation";
import Controls from "../common";
import { Toast } from "../common/Toast/Toast";

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  ssn: string;
  code: string;
  maritalStatus: string;
  status: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  // Add more fields as necessary
}

function GuardianInfo() {
  const {
    formData,
    setChildObjFormData,
    addNestedChildToSubChild,
    selectedRowId,
  } = useStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: formData.responsibleParties?.[selectedRowId],
    resolver: yupResolver(guardianSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data, "dataaa");
    setChildObjFormData("responsibleParties", data);
    Toast("Guardian Form data saved successfully!");
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
              <Controls.ControlledInput
                name="ssn"
                control={control}
                errors={errors}
                label="SSN"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controls.ControlledInput
                name="code"
                control={control}
                errors={errors}
                label="Code"
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

            <Grid item xs={12} sm={6}>
              <Controls.ControlledInput
                name="phone"
                control={control}
                errors={errors}
                label="Phone"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controls.ControlledInput
                name="email"
                control={control}
                errors={errors}
                label="Email"
              />
            </Grid>

            <Grid item xs={12}>
              <Controls.ControlledInput
                name="address1"
                control={control}
                errors={errors}
                label="Address 1"
              />
            </Grid>

            <Grid item xs={12}>
              <Controls.ControlledInput
                name="address2"
                control={control}
                errors={errors}
                label="Address 2"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controls.ControlledInput
                name="city"
                control={control}
                errors={errors}
                label="City"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controls.ControlledInput
                name="state"
                control={control}
                errors={errors}
                label="State"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controls.ControlledInput
                name="zipCode"
                control={control}
                errors={errors}
                label="Zip Code"
              />
            </Grid>

            {/* Authorized Party Section */}
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item xs={6} sm={6}>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, mb: 1, color: "#424242" }}
                  >
                    Authorized Party
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ float: "right" }}
                    onClick={() =>
                      addNestedChildToSubChild(
                        "responsibleParties",
                        "authorizedParties",
                        {
                          firstName: "",
                          lastName: "",
                          authorized: false,
                        }
                      )
                    }
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
              {formData?.responsibleParties?.[
                selectedRowId
              ]?.authorizedParties?.map((item, index) => (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    alignItems="center"
                  >
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

                    <Grid item sm={3}>
                      <FormControlLabel
                        disabled
                        control={<Checkbox checked={item?.authorized} />}
                        label="Authorized"
                      />
                    </Grid>
                    <Grid item sm={3}>
                      <Button variant="contained" fullWidth>
                        Profile
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: 10, float: "right" }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GuardianInfo;
