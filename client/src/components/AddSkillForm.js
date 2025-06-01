import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import "../styles/AddCategoryForm.css";

function AddSkillForm({ skills, onSetSkills }) {
  return (
    <div>
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
            setFieldError("newCategory", "This category already exists");
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
        <Form className="category-form">
          <div>
            <Field
              name="newCategory"
              type="text"
              placeholder="e.g., Web Development"
            />
            <button type="submit">Add New Skill</button>
          </div>

          <ErrorMessage name="newCategory" component="div" className="error" />
        </Form>
      </Formik>
    </div>
  );
}

export default AddSkillForm;
