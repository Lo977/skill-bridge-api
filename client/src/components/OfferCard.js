import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditOfferForm from "./EditOfferForm";

function OfferCard({ user, onDelete, onEdit }) {
  const [expandCategory, setExpandCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  console.log(expandCategory);
  const renderedOffers = user.skills.map((skill) => {
    return (
      <div>
        <h4
          key={skill.id}
          onClick={() =>
            setExpandCategory(expandCategory === skill.name ? null : skill.name)
          }
        >
          {skill.name}
        </h4>
        {expandCategory === skill.name && (
          <>
            <ul>
              {skill.offers.map((offer) => (
                <>
                  <strong> - {offer.title}</strong>- {offer.description}
                  <div>
                    <button onClick={() => onDelete(offer.id)}>Delete</button>
                    <button
                      onClick={() => {
                        setShowForm(true);
                        navigate(`/offers/${offer.id}`);
                      }}
                    >
                      Edit
                    </button>
                    {showForm && (
                      <EditOfferForm
                        offer={offer}
                        onEdit={onEdit}
                        onSetForm={setShowForm}
                      />
                    )}
                  </div>
                </>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  });

  return <div>{renderedOffers}</div>;
}

export default OfferCard;
