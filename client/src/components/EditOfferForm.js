import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditOfferForm({ user, onUpdate, onCancel }) {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    fetch(`/offers/${id}`)
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to load offer");
      })
      .then(setOffer)
      .catch((err) => console.error(err));
  }, [id]);

  if (!offer) return <p>Loading offer...</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetch(`/offers/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(offer),
        })
          .then((r) => r.json())
          .then((updated) => {
            if (onUpdate) onUpdate(updated);
          });
      }}
    >
      <label>Title</label>
      <input
        type="text"
        value={offer.title}
        onChange={(e) => setOffer({ ...offer, title: e.target.value })}
      />
      <label>Description</label>
      <input
        type="text"
        value={offer.description}
        onChange={(e) => setOffer({ ...offer, description: e.target.value })}
      />
      <button type="submit">Update</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default EditOfferForm;
