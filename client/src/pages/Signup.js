import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Signup({ onLogin }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      const { confirmPassword, ...signupData } = values;

      fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Signup failed");
          return res.json();
        })
        .then((user) => {
          if (typeof onLogin === "function") {
            onLogin(user);
            navigate("/");
          }
        })
        .catch((err) => {
          setStatus(err.message || "Something went wrong");
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="auth-form">
      <input
        name="username"
        type="text"
        placeholder="Username"
        {...formik.getFieldProps("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <p className="error-message">{formik.errors.username}</p>
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        {...formik.getFieldProps("email")}
      />
      {formik.touched.email && formik.errors.email && (
        <p className="error-message">{formik.errors.email}</p>
      )}

      <input
        name="password"
        type="password"
        placeholder="Password"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <p className="error-message">{formik.errors.password}</p>
      )}

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        {...formik.getFieldProps("confirmPassword")}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <p className="error-message">{formik.errors.confirmPassword}</p>
      )}

      {formik.status && <p className="error-message">{formik.status}</p>}

      <button
        type="submit"
        className="auth-button"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}

export default Signup;
