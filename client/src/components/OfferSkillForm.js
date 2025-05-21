import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";

function OfferSkillForm({
  user,
  skills,
  onCancel,
  onAddOffer,
  preSelectSkill,
}) {
  const initialValues = {
    title: "",
    description: "",
    skill_id: preSelectSkill ? preSelectSkill.id : "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    skill_id: Yup.string().required("Category is required"),
  });
  function handleSubmit(values, { resetForm }) {
    const newOffer = {
      ...values,
      user_id: user.id,
    };
    fetch("/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOffer),
    })
      .then((r) => r.json())
      .then(onAddOffer);
    resetForm();
  }
  return (
    <div>
      OfferSkillForm
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {!preSelectSkill && (
            <div>
              <Field as="select" name="skill_id">
                <option value="">Select a Category</option>
                {skills.map((skill) => (
                  <option value={skill.id} key={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="skill_id" component="div" />
            </div>
          )}
          <Field type="text" name="title" placeholder="Title" />
          <ErrorMessage name="title" component="div" />
          <Field
            type="text"
            name="description"
            placeholder="
          Description"
          />
          <ErrorMessage name="description" component="div" />
          <div>
            <button type="submit">Add</button>
            <button onClick={() => onCancel(null)}>Cancel</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default OfferSkillForm;
