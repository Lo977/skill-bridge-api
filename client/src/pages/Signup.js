import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Signup({ onLogin }) {
  const initialVallues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Please confirm your password"),
  });
  function handleSubmit(values, { setErrors, resetForm }) {
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => onLogin(user));
        resetForm();
      } else {
        res
          .json()
          .then((error) =>
            setErrors({ general: error.message } || "Sign up failed")
          );
      }
    });
  }
  return (
    <div>
      <Formik
        initialValues={initialVallues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field type="text" name="username" placeholder="Username..." />
          <ErrorMessage name="username" component="div" />
          <Field type="text" name="email" placeholder="Email..." />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" placeholder="Password..." />
          <ErrorMessage name="password" component="div" />
          <Field
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password..."
          />
          <ErrorMessage name="confirmPassword" component="div" />
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
