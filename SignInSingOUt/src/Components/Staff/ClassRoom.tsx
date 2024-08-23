import React from "react";
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  CardContent,
  Card,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useStore from "./store/useStore";
import Controls from "../common";

interface ClassRoomProps {
  handleTabChange: (
    event: React.SyntheticEvent,
    newValue: number,
    rowId: number
  ) => void;
}

const ClassRooms: React.FC<ClassRoomProps> = ({ handleTabChange }) => {
  const { formData, setFormData, addClassRoom } = useStore();
  console.log(formData, "fromDaraaa");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(),
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
          {/* Program  Section  */}
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Classrooms</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    addClassRoom({
                      id: "",
                      location: "",
                      startDate: "",
                      endDate: "",
                    })
                  }
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controls.ControlledInput
                name="program"
                control={control}
                errors={errors}
                component={
                  <Controls.Select label="Program" options={["helllo"]} />
                }
              />
              {/* <Controls.Select
                name="program"
                control={control}
                errors={errors}
                label="Program"
              /> */}
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
              <Typography variant="h6">Location</Typography>
            </Grid>
            {formData?.classroom?.map((item, index) => (
              <Grid container spacing={2} sx={{ mt: 1 }} key={index}>
                <Grid item xs={12} sm={2.5}>
                  <TextField disabled fullWidth label="id" value={item?.id} />
                </Grid>

                <Grid item xs={12} sm={2.5}>
                  <TextField
                    disabled
                    fullWidth
                    label="Location Name"
                    value={item?.location}
                  />
                </Grid>

                <Grid item xs={12} sm={2.5}>
                  <TextField
                    disabled
                    fullWidth
                    label="Start Date"
                    value={item?.startDate}
                  />
                </Grid>

                <Grid item xs={12} sm={2.5}>
                  <TextField
                    disabled
                    fullWidth
                    label="End Date"
                    value={item?.endDate}
                  />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ height: "56px" }}
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

export default ClassRooms;
