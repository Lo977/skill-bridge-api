import React, { useState } from "react";

function OfferCard({ user }) {
  const [expandCategory, setExpandCategory] = useState(null);
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
