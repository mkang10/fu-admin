import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(
      /@(fpt|fe)\.edu\.vn$/,
      "Email must be from @fpt.edu.vn or @fe.edu.vn"
    )
    .required("This field is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("This field is required"),
});
