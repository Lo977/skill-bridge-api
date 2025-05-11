import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/AddCategoryForm.css";

function AddCategoryForm({ skills, setSkills }) {
  return (
    <Formik
      initialValues={{ newCategory: "" }}
      validationSchema={Yup.object({
        newCategory: Yup.string().trim().required("Category name is required"),
      })}
      onSubmit={(values, { resetForm, setSubmitting, setFieldError }) => {
        const newName = values.newCategory.trim().toLowerCase();
        const isDuplicate = skills.find(
          (skill) => skill.name.toLowerCase() === newName
        );

        if (isDuplicate) {
          setFieldError("newCategory", "This category already exists.");
          setSubmitting(false);
          return;
        }

        fetch("/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: values.newCategory }),
        })
          .then((r) => {
            if (r.ok) return r.json();
            throw new Error("Failed to create category");
          })
          .then((newSkill) => {
            setSkills((prev) => [...prev, newSkill]);
            resetForm();
          })
          .catch((err) => {
            console.error(err);
            setFieldError("newCategory", err.message);
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
        <Form className="add-category-form">
          <div className="add-category-input-group">
            <Field
              name="newCategory"
              type="text"
              placeholder="New skill category"
              className="add-category-input"
            />
            <button
              type="submit"
              className="add-category-button"
              disabled={isSubmitting}
            >
              Add Category
            </button>
          </div>

          <ErrorMessage
            name="newCategory"
            component="div"
            className="error-message"
          />
        </Form>
      )}
    </Formik>
  );
}

export default AddCategoryForm;
