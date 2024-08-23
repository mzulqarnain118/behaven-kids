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
import {staffProgramSchema  } from "./validation";
import Controls from "../common";


interface StaffProgramProps {
  handleTabChange: (
    event: React.SyntheticEvent,
    newValue: number,
    rowId: number
  ) => void;
}

const StaffProgram: React.FC<StaffProgramProps> = ({ handleTabChange }) => {
  const { formData, setFormData, addStaffPro  } = useStore();
  console.log(formData,"fromDaraaa")

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(staffProgramSchema),
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
           <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
              marginBottom={3}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Program</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>  addStaffPro({
                      id: "",
                      location: "",
                      startDate: "",
                      endDate:"",
                    })
                  }
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Controller
          name="enrollmentDate1"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...field}
              error={!!errors.enrollmentDate1}
              helperText={errors.enrollmentDate1?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="startDate1"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...field}
              error={!!errors.startDate1}
              helperText={errors.startDate1?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="endDate1"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...field}
              error={!!errors.endDate1}
              helperText={errors.endDate1?.message}
            />
          )}
        />
      </Grid>
    </Grid>
          {/* Program  Section  */}
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Program</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>  addStaffPro({
                      id: "",
                      location: "",
                      startDate: "",
                      endDate:"",
                    })
                  }
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {formData?.staffProgram?.map((item, index) => (
              <Grid container spacing={2} sx={{ mt: 1 }} key={index}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled
                    fullWidth
                    label="id"
                    value={item?.id}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled
                    fullWidth
                    label="Location"
                    value={item?.location}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                <TextField
                    disabled
                    fullWidth
                    label="Event Date"
                    value={item?.startDate}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                <TextField
                    disabled
                    fullWidth
                    label="End Date"
                    value={item?.endDate}
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

export default StaffProgram;


