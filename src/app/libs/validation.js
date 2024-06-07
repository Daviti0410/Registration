import * as yup from "yup";

const emailDomainRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const registrationSchema = yup.object().shape({
  loginName: yup
    .string()
    .required("login name is required")
    .min(3, "login name must be at least 3 charachters long"),
  email: yup
    .string()
    .required("Email is required")
    .matches(emailDomainRegex, "Email must be a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = yup.object().shape({
  loginName: yup.string().required("Login name is required"),
  password: yup.string().required("Password is required"),
});
