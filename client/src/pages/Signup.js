import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/Signup.css";

function Signup({ onLogin }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  return (
    <div className="signup-container">
      <h2 className="auth-title">Create Your Account</h2>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => {
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
              onLogin(user);
              navigate("/");
            })
            .catch((err) => {
              setStatus(err.message || "Something went wrong");
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="auth-form">
            <Field name="username" type="text" placeholder="Username" />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />

            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />

            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />

            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error-message"
            />

            {status && <div className="error-message">{status}</div>}

            <button
              type="submit"
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="auth-switch">
        <span>Already have an account?</span>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    </div>
  );
}

export default Signup;
