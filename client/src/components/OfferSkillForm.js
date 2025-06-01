import { ErrorMessage, Field, Form, Formik } from "formik";
import { useOutletContext, Link } from "react-router-dom";

import * as Yup from "yup";
import React from "react";
import "../styles/OfferSkillForm.css";

function OfferSkillForm({
  user,
  skills,
  onAddOffer,
  onCancel,
  preselectedSkill,
}) {
  const initialValues = {
    title: "",
    description: "",
    skill_id: preselectedSkill ? preselectedSkill.id : "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    skill_id: Yup.string().required("Skill is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newOffer = { ...values, user_id: user.id };
    fetch("/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOffer),
    })
      .then((r) => r.json())
      .then(onAddOffer);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="offer-skill-form">
          {!preselectedSkill && (
            <div>
              <Field as="select" name="skill_id">
                <option value="">Select a Skill</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="skill_id" component="div" />
              <p>
                Don't see your skill? Add one in the{" "}
                <Link to="/skills">Skills</Link> section.
              </p>
            </div>
          )}

          <div>
            <Field type="text" name="title" placeholder="Title" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <Field type="text" name="description" placeholder="Description" />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add"}
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default OfferSkillForm;
