import React from "react";
import {
  Grid,
  Box,
  Button,
  CardContent,
  Card,
  Typography,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useStore from "./store/useStore";
import { clinicSchema } from "./validation";
import Controls from "../common";

interface ClinicProps {
  handleTabChange: (
    event: React.SyntheticEvent,
    newValue: number,
    rowId: number
  ) => void;
}

const ClinicProfile: React.FC<ClinicProps> = () => {
  const {
    formData,
    setFormData,
    selectedRowId,
    addNestedChildToSubChild,
    setSelectedRowId,
    handlePopup,
  } = useStore();
  console.log(formData, "fromDaraaa");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(clinicSchema),
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
          sx={{ padding: 3, p: 2 }}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid sx={{ float: "right" }}>
            <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
              Add
            </Button>
            <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
              Edit
            </Button>
            <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
              Delete
            </Button>
          </Grid>
          <Grid container spacing={2}>
            {/* Clinic Name and Website */}
            <Grid item xs={12} md={6}>
              <Controls.ControlledInput
                name="clinicName"
                control={control}
                errors={errors}
                label="Clinic Name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.ControlledInput
                name="website"
                control={control}
                errors={errors}
                label="Website"
              />
            </Grid>

            {/* Phone and FAX */}
            <Grid item xs={12} md={6}>
              <Controls.ControlledInput
                name="phone"
                control={control}
                errors={errors}
                label="Phone"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.ControlledInput
                name="fax"
                control={control}
                errors={errors}
                label="FAX"
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <Controls.ControlledInput
                name="address1"
                control={control}
                errors={errors}
                fullWidth
                label="Address 1"
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.ControlledInput
                name="address2"
                control={control}
                errors={errors}
                fullWidth
                label="Address 2"
              />
            </Grid>

            {/* City, State, Zip Code */}
            <Grid item xs={12} md={4}>
              <Controls.ControlledInput
                name="city"
                control={control}
                errors={errors}
                label="City"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controls.ControlledInput
                name="state"
                control={control}
                errors={errors}
                label="State"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controls.ControlledInput
                name="zipCode"
                fullWidth
                control={control}
                errors={errors}
                label="Zip Code"
              />
            </Grid>

            {/* Doctor Section */}
            <Box sx={{ mt: 4 }}>
              <Grid
                container
                spacing={2}
                sx={{ mt: 1 }}
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Doctor</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      addNestedChildToSubChild("clinic", "doctors", {
                        firstName: "",
                        lastName: "",
                        email: "",
                      })
                    }
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>

              {formData?.clinic?.[selectedRowId]?.doctors?.map(
                (item, index) => (
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
                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ height: "56px", textAlign: "right" }}
                        onClick={() => {
                          handlePopup(
                            true,
                            "Primary Doctor Information",
                            "doctor"
                          );
                          setSelectedRowId(index);
                        }}
                      >
                        Profile
                      </Button>
                    </Grid>
                  </Grid>
                )
              )}
            </Box>
          </Grid>

          {/* Save and Navigation Buttons */}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Box sx={{ float: "right" }}>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClinicProfile;
