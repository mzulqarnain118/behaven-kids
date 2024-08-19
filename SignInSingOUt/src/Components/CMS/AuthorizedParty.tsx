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
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useStore from "./store/useStore";
import { authorizedPartySchema } from "./validation";
import Controls from "../common";
import { Toast } from "../common/Toast/Toast";

function AuthorizedParty() {
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
  } = useForm({
    defaultValues: formData.authorizedParties?.[selectedRowId],
    // @ts-ignore
    resolver: yupResolver(authorizedPartySchema),
  });

  const onSubmit = (data: any) => {
    setChildObjFormData("authorizedParties", data);
    Toast("Authorized Party Form data saved successfully!");
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
          {/* Main Authorized Information */}
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
              <Controls.ControlledInput
                name="code"
                control={control}
                errors={errors}
                label="Code"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="authDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Auth Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...field}
                    error={!!errors.authDate}
                    helperText={errors.authDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="authExpDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Expiration Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...field}
                    error={!!errors.authExpDate}
                    helperText={errors.authExpDate?.message}
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
                    <InputLabel id="authGender-label">Select Gender</InputLabel>
                    <Select
                      label="Select Gender"
                      labelId="authGender-label"
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

            <Grid item xs={12} sm={3}>
              <Typography variant="h6" sx={{ mt: "0.7rem", color: "#424242" }}>
                Authorized By:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controls.ControlledInput
                name="authByFirstName"
                control={control}
                errors={errors}
                label="First Name"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controls.ControlledInput
                name="authByLastName"
                control={control}
                errors={errors}
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="relationship"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="martial-label">
                      Select Relationship
                    </InputLabel>
                    <Select
                      labelId="martial-label"
                      id="martial"
                      fullWidth
                      {...field}
                      error={!!errors.relationship}
                      label="Select Relationship"
                    >
                      <MenuItem value="" disabled>
                        Relative
                      </MenuItem>
                      <MenuItem value="Single">Friend</MenuItem>
                      <MenuItem value="Married">Neighbor</MenuItem>
                      <MenuItem value="Divorced">Father</MenuItem>
                      <MenuItem value="Divorced">Mother</MenuItem>
                      <MenuItem value="Divorced">Grandfather</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.relationship && (
                <Typography color="error">
                  {errors.relationship.message}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Divider sx={{ py: "2rem" }} />
          <Grid sx={{ marginLeft: 2 }}>
            <Grid item xs={12} sm={6}>
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
                    Patients
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ float: "right" }}
                    onClick={() =>
                      addNestedChildToSubChild(
                        "authorizedParties",
                        "patients",
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
              {formData?.authorizedParties?.[selectedRowId]?.patients?.map(
                (item, index) => (
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
                )
              )}

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
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AuthorizedParty;
