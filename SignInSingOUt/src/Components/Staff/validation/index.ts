import * as Yup from "yup";

// Regular expression for US phone numbers (formats: (123) 456-7890, 123-456-7890, 123.456.7890, +1-123-456-7890)
// const phoneRegExp = /^(\+1[-.\s]?)?(\([2-9][0-8][0-9]\)[-.\s]?)?([2-9][0-9]{2}[-.\s]?[0-9]{4})$/;

export const staffProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
    .required("Last Name is required"),
  dob: Yup.date().required("Date of Birth is required").nullable(),
  gender: Yup.string().required("Gender is required"),
  code: Yup.number()
    .required("Code is required")
    .min(100000, "Invalid Code")
    .max(999999, "Invalid Code"),
  maritalStatus: Yup.string().required("Marital Status is required"),
  activeStatus: Yup.string().required("Status is required"),
  address1: Yup.string().required("Address 1 is required"),
  address2: Yup.string().required("Address 2 is required"),
  city: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed")
    .required("City is required"),
  state: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed")
    .required("State is required"),
  zipCode: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, "Invalid Zip Code format")
    .required("Zip Code is required"),

  department: Yup.string().required("Department  is required"),
  roleDate: Yup.date().required("Date  is required").nullable(),
  role: Yup.string().required("role is required"),

  selectEvent: Yup.string().required("Event is required"),
  eventDate: Yup.date().required("Date is required").nullable(),

  eventLocation: Yup.string().required("Location is required"),
});

export const staffLocationSchema = Yup.object().shape({
  department: Yup.string()
    .required("Department is required")
    .oneOf(["Active", "Inactive"], "Invalid department selected"),
  eventdate: Yup.date()
    .required("Event Date is required")
    .nullable()
    .typeError("Event Date is not valid"),
  role: Yup.string()
    .required("Role is required")
    .oneOf(["Active", "Inactive"], "Invalid role selected"),
  eventStatus: Yup.string()
    .required("Status is required")
    .oneOf(["Termination", "Role Change"], "Invalid status selected"),
  date: Yup.date()
    .required("Event Date is required")
    .nullable()
    .typeError("Event Date is not valid"),
  location: Yup.string()
    .required("Location is required")
    .oneOf(["USA", "London"], "Invalid location selected"),
});

export const staffProgramSchema = Yup.object().shape({
  enrollmentDate1: Yup.date()
    .required("Enrollment Date is required")
    .typeError("Enrollment Date must be a valid date"),
  startDate1: Yup.date()
    .required("Start Date is required")
    .typeError("Start Date must be a valid date"),
  endDate1: Yup.date()
    .required("End Date is required")
    .typeError("End Date must be a valid date")
    .min(Yup.ref("startDate1"), "End Date can't be before Start Date"),
  staffProgram: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required("ID is required"),
      location: Yup.string().required("Location is required"),
      startDate: Yup.date()
        .required("Start Date is required")
        .typeError("Start Date must be a valid date"),
      endDate: Yup.date()
        .required("End Date is required")
        .typeError("End Date must be a valid date")
        .min(Yup.ref("startDate"), "End Date can't be before Start Date"),
    })
  ),
});
