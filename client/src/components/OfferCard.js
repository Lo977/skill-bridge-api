import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OfferCard({ user, onDelete }) {
  const [expandCategory, setExpandCategory] = useState(null);
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
                    <button onClick={() => navigate(`/offers/${offer.id}`)}>
                      Edit
                    </button>
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
