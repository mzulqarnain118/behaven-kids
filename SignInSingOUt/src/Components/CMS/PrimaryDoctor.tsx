import {
  Grid,
  Box,
  Button,
  Typography,
  CardContent,
  Card,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useStore from "./store/useStore";
import { primaryDoctorSchema } from "./validation";
import Controls from "../common";
import { Toast } from "../common/Toast/Toast";

interface FormData {
  firsName: string;
  lastName: string;
  email: string;
  phone: string;
  clinicName: string;
  website: string;
  primaryPhone: string;
  fax: string;
}

function PrimaryDoctor() {
  const { setChildObjFormData } = useStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // defaultValues: formData.responsibleParties?.[selectedRowId],
    resolver: yupResolver(primaryDoctorSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data, "dataaa");
    setChildObjFormData("responsibleParties", data);
    Toast("Primary Doctor Form data saved successfully!");
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
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#424242" }}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controls.ControlledInput
                    name="firsName"
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
                    name="email"
                    control={control}
                    errors={errors}
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controls.ControlledInput
                    name="phone"
                    control={control}
                    errors={errors}
                    label="Mobile"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 4, mb: 1, color: "#424242" }}>
                Clinic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controls.ControlledInput
                    name="clinicName"
                    control={control}
                    errors={errors}
                    label="Clinic Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controls.ControlledInput
                    name="website"
                    control={control}
                    errors={errors}
                    label="Website"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controls.ControlledInput
                    name="primaryPhone"
                    control={control}
                    errors={errors}
                    label="Phone"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controls.ControlledInput
                    name="fax"
                    control={control}
                    errors={errors}
                    label="Fax"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 3, float: "right" }}
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

export default PrimaryDoctor;
