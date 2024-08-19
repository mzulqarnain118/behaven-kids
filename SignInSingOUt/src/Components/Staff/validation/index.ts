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
  ssn: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{4}$/, "Invalid SSN format (e.g., 123-45-6789)")
    .required("SSN is required"),
  code: Yup.number()
    .required("Code is required")
    .min(100000, "Invalid Code")
    .max(999999, "Invalid Code"),
  maritalStatus: Yup.string().required("Marital Status is required"),
  status: Yup.string().required("Status is required"),
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
  
  deportment: Yup.string().required("Deportment  is required"),
  roleDate: Yup.date().required("Date  is required").nullable(),
  role: Yup.string().required("role is required"),

  event: Yup.string().required("Event is required"),
  eventDate: Yup.date().required("Date is required").nullable(),
    
  location: Yup.string().required("Location is required"),
  // responsibleParties: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       firstName: Yup.string().required("First Name is required"),
  //       lastName: Yup.string().required("Last Name is required"),
  //       relationship: Yup.string().required("Relationship is required"),
  //     })
  //   )
  //   .min(1, "At least one responsible party is required"),
  // authorizedParties: Yup.array().of(
  //   Yup.object().shape({
  //     firstName: Yup.string().required("First Name is required"),
  //     phone: Yup.number().required("Phone is required"),
  //     email: Yup.string().email("Invalid email").required("Email is required"),
  //   })
  // ),
  // emergencyContacts: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       firstName: Yup.string().required("First Name is required"),
  //       phone: Yup.number().required("Phone is required"),
  //       email: Yup.string()
  //         .email("Invalid email")
  //         .required("Email is required"),
  //     })
  //   )
  //   .min(1, "At least one emergency contact is required"),
  // doctors: Yup.array().of(
  //   Yup.object().shape({
  //     firstName: Yup.string().required("Doctor's First Name is required"),
  //     lastName: Yup.string().required("Doctor's Last Name is required"),
  //     email: Yup.string()
  //       .email("Invalid email address")
  //       .required("Doctor's Email is required"),
  //     clinicName: Yup.string().required("Clinic Name is required"),
  //     clinicWebsite: Yup.string().url("Invalid URL"),
  //     clinicPhone: Yup.number().required("Clinic Phone is required"),
  //   })
  // ),
});
export const staffLocationSchema = Yup.object().shape({
  deportment: Yup.string().required("Deportment  is required"),
  roleDate: Yup.date().required("Date  is required").nullable(),
  role: Yup.string().required("role is required"),

  event: Yup.string().required("Event is required"),
  eventDate: Yup.date().required("Date is required").nullable(),
    
  location: Yup.string().required("Location is required"),
});
