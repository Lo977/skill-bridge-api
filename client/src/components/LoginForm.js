import React, { useContext } from "react";
import UserContext from "./UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

function LoginForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="login-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
