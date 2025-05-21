import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditOfferForm from "./EditOfferForm";
import OfferSkillForm from "./OfferSkillForm";

function OfferCard({
  user,
  onDelete,
  onEdit,
  skills,
  onAddOffer,
  editId,
  setEditId,
}) {
  const [expandCategory, setExpandCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFormForCategory, setShowFormForCategory] = useState(null);
  const [editingOfferId, setEditingOfferId] = useState(null);
  // console.log(showFormForCategory);
  const navigate = useNavigate();
  console.log(skills);
  const renderedOffers = user.skills.map((skill) => {
    const selectedSkill = skills.find((s) => s.id === skill.id) || null;
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
                <li key={offer.id}>
                  {editId === offer.id ? (
                    <EditOfferForm
                      offer={offer}
                      onUpdate={onEdit}
                      onCancel={() => {
                        setEditId(null);
                        navigate("/offers");
                      }}
                    />
                  ) : (
                    <>
                      <strong key={offer.id}> - {offer.title}</strong>-{" "}
                      {offer.description}
                      <div>
                        <button onClick={() => onDelete(offer.id)}>
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setEditId(offer.id);
                            navigate(`/offers/${offer.id}`);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {showFormForCategory === skill.name ? (
              <OfferSkillForm
                user={user}
                skills={skills}
                onCancel={setShowFormForCategory}
                preSelectSkill={selectedSkill}
                onAddOffer={(newOffer) => {
                  onAddOffer(newOffer);
                  setShowFormForCategory(null);
                }}
              />
            ) : (
              <button onClick={() => setShowFormForCategory(skill.name)}>
                Add Offer
              </button>
            )}
          </>
        )}
      </div>
    );
  });

  return <div>{renderedOffers}</div>;
}

export default OfferCard;
