import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../styles/EditOfferForm.css";
import * as Yup from "yup";

function EditOfferForm({ offer, onUpdate, onCancel }) {
  function handleSubmit(values, { setSubmitting }) {
    fetch(`/offers/${offer.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then((updatedOffer) => onUpdate(updatedOffer))
      .finally(() => setSubmitting(false));
  }

  return (
    <Formik
      initialValues={{
        title: offer.title || "",
        description: offer.description || "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      })}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="edit-offer-form">
          <label htmlFor="title">Title:</label>
          <Field type="text" name="title" />
          <ErrorMessage
            name="title"
            component="div"
            className="error-message"
          />

          <label htmlFor="description">Description:</label>
          <Field type="text" name="description" />
          <ErrorMessage
            name="description"
            component="div"
            className="error-message"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ marginLeft: "1rem" }}
          >
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default EditOfferForm;
