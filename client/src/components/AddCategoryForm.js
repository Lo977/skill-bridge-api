import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";

function AddCategoryForm({ skills, onSetSkills }) {
  return (
    <div>
      AddCategoryForm
      <Formik
        initialValues={{ newCategory: "" }}
        validationSchema={Yup.object({
          newCategory: Yup.string()
            .trim()
            .required("Category name is required"),
        })}
        onSubmit={(values, { setFieldError, resetForm }) => {
          const newName = values.newCategory.trim().toLowerCase();
          if (skills.some((skill) => skill.name.toLowerCase() === newName)) {
            setFieldError("newCategory", "This category is already exists ");
            return;
          }
          fetch("/skills", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: values.newCategory }),
          })
            .then((r) => r.json())
            .then((newSkill) => onSetSkills([...skills, newSkill]));
          resetForm();
        }}
      >
        <Form>
          <Field
            name="newCategory"
            type="text"
            placeholder="e.g., Web Development"
          />
          <button>Add New Category</button>
          <ErrorMessage name="newCategory" component="div" />
        </Form>
      </Formik>
    </div>
  );
}

export default AddCategoryForm;
