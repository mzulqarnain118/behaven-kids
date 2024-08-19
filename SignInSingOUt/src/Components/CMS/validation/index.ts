import * as Yup from "yup";

// Regular expression for US phone numbers (formats: (123) 456-7890, 123-456-7890, 123.456.7890, +1-123-456-7890)
const phoneRegExp =
  /^(\+1[-.\s]?)?(\([2-9][0-8][0-9]\)[-.\s]?)?([2-9][0-9]{2}[-.\s]?[0-9]{4})$/;

export const primaryDoctorSchema = Yup.object().shape({
  firsName: Yup.string()
    .required("First Name is required")
    .matches(/^[a-zA-Z]+$/, "First Name should only contain letters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[a-zA-Z]+$/, "Last Name should only contain letters"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  phone: Yup.string()
    .required("Mobile number is required")
    .matches(phoneRegExp, "Mobile number is not valid"),
  clinicName: Yup.string().required("Clinic Name is required"),
  website: Yup.string()
    .required("Website is required")
    .url("Please enter a valid website URL"),
  primaryPhone: Yup.string()
    .required("Primary Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  fax: Yup.string()
    .required("Fax number is required")
    .matches(phoneRegExp, "Fax number is not valid"),
});

export const clientProfileSchema = Yup.object().shape({
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
export const guardianSchema = Yup.object().shape({
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
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^(\+1[-.●]?)?\(?\d{3}\)?[-.●]?\d{3}[-.●]?\d{4}$/,
      "Invalid US phone number format (e.g., 123-456-7890)"
    )
    .required("Phone number is required"),
});
export const authorizedPartySchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
    .required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  code: Yup.string()
    .matches(/^[1-9]+$/, "Only numbers are allowed")
    .required("Code is required"),
  authDate: Yup.date().required("Auth Date is required").nullable(),
  authExpDate: Yup.date().required("Expiration Date is required").nullable(),
  authByFirstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
    .required("First Name is required"),
  authByLastName: Yup.string().required("Last Name is required"),
  relationship: Yup.string().required("Relationship is required"),
});
