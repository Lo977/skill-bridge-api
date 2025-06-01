import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import "../styles/EditOfferForm.css";

function EditOfferForm({ onUpdate, offer, onCancel }) {
  const handleSubmit = (values) => {
    fetch(`/offers/${offer.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then((updatedOffer) => {
        onUpdate(updatedOffer);
        onCancel();
      })
      .catch((err) => {
        console.error("Error updating offer:", err);
        alert("Failed to update offer.");
      });
  };

  return (
    <div>
      <Formik
        key={offer.id}
        initialValues={{
          title: offer.title || "",
          description: offer.description || "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="edit-offer">
          <label htmlFor="title">Title</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" />

          <label htmlFor="description">Description</label>
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
