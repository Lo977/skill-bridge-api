import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/OfferSkillForm.css";

function OfferSkillForm({
  user,
  skills,
  onAddOffer,
  preselectedSkill = null,
  onCancel,
}) {
  const initialValues = {
    title: "",
    description: "",
    skill_id: preselectedSkill ? preselectedSkill.id : "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    skill_id: Yup.string().required("Category is required"),
  });

  function handleSubmit(values, { setSubmitting, resetForm }) {
    const newOffer = {
      ...values,
      user_id: user.id,
    };

    fetch("/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOffer),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            onAddOffer?.(data);
            resetForm();
          });
        } else {
          throw new Error("Failed to create offer");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="offer-skill-form">
          <div>
            <Field as="select" name="skill_id" disabled={!!preselectedSkill}>
              <option value="">Select a category</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="skill_id" component="div" className="error" />
          </div>
          <div>
            <Field name="title" type="text" placeholder="Title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div>
            <Field name="description" type="text" placeholder="Description" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Add
          </button>

          {preselectedSkill && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{ marginLeft: "0.5rem" }}
            >
              Cancel
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default OfferSkillForm;
