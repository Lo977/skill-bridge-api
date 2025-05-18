import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login({ onLogin }) {
  const initalVallues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  function handleSubmit(values, { setErrors, resetForm }) {
    fetch("/login", {
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
            setErrors({ general: error.message || "Login failed" })
          );
      }
    });
  }

  return (
    <div>
      <Formik
        initialValues={initalVallues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            type="text"
            id="username"
            name="username"
            placeholder="username"
          />
          <ErrorMessage name="username" component="div" />
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
