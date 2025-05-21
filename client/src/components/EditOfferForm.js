import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
// import { Form } from "react-router-dom";
import * as Yup from "yup";

function EditOfferForm({ onUpdate, offer, onSetForm, onCancel }) {
  function handleSubmit(values) {
    fetch(`/offers/${offer.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then(onUpdate);
    onSetForm(false);
  }
  return (
    <div>
      <Formik
        initialValues={{
          title: offer.title || "",
          description: offer.description || "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required(),
          description: Yup.string().required(),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <label for="title">Title</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" />
          <label for="description">Description</label>
          <Field type="text" name="description" />
          <ErrorMessage name="description" component="div" />
          <div>
            <button type="submit">Update</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EditOfferForm;
