import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import "../styles/Auth.css"; // Same as used in Login

function Signup({ onLogin }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Signup failed");
          return res.json();
        })
        .then((user) => {
          onLogin(user);
          navigate("/");
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

      {formik.status && <p className="error-message">{formik.status}</p>}

      <button
        type="submit"
        className="auth-button"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}

export default Signup;
