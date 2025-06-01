import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OfferSkillForm from "../components/OfferSkillForm";
import EditOfferForm from "../components/EditOfferForm";
import OfferCard from "../components/OfferCard";
import UserContext from "../components/UserContext";
import "../styles/Offer.css";

function SkillOffers() {
  const navigate = useNavigate();
  const { skillId, id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [allSkills, setAllSkills] = useState([]);
  const [showGeneralOfferForm, setShowGeneralOfferForm] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState(skillId || null);

  useEffect(() => {
    fetch("/skills")
      .then((res) => res.json())
      .then(setAllSkills);
  }, []);

  const handleAddOffer = (newOffer) => {
    const skillExists = user.skills.some(
      (skill) => skill.id === newOffer.skill_id
    );
    if (skillExists) {
      const updatedSkills = user.skills.map((skill) =>
        skill.id === newOffer.skill_id
          ? { ...skill, offers: [...skill.offers, newOffer] }
          : skill
      );
      setUser({ ...user, skills: updatedSkills });
    } else {
      const newSkill = allSkills.find((s) => s.id === newOffer.skill_id);
      const updatedSkills = [
        ...user.skills,
        { ...newSkill, offers: [newOffer] },
      ];
      setUser({ ...user, skills: updatedSkills });
    }
    setShowGeneralOfferForm(false);
  };

  const handleDelete = (id) => {
    fetch(`/offers/${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        const updatedSkills = user.skills
          .map((skill) => ({
            ...skill,
            offers: skill.offers.filter((o) => o.id !== id),
          }))
          .filter((skill) => skill.offers.length > 0);
        setUser({ ...user, skills: updatedSkills });
      }
    });
  };

  const handleEdit = (updatedOffer) => {
    const updatedSkills = user.skills.map((skill) =>
      skill.id === updatedOffer.skill_id
        ? {
            ...skill,
            offers: skill.offers.map((o) =>
              o.id === updatedOffer.id ? updatedOffer : o
            ),
          }
        : skill
    );
    setUser({ ...user, skills: updatedSkills });
    navigate(`/my-skills/${updatedOffer.skill_id}/offers`);
  };

  let foundOffer = null;
  for (const skill of user.skills) {
    const offer = skill.offers.find((o) => o.id === parseInt(id));
    if (offer) {
      foundOffer = offer;
      break;
    }
  }

  let foundSkill = null;
  if (foundOffer) {
    foundSkill = user.skills.find((s) => s.id === foundOffer.skill_id);
  } else if (skillId) {
    foundSkill = user.skills.find((s) => s.id === parseInt(skillId));
  }

  // if (skillId && id && foundOffer && foundSkill)
  if (foundOffer && foundSkill) {
    return (
      <div className="offer-container">
        <EditOfferForm
          offer={foundOffer}
          onUpdate={handleEdit}
          onCancel={() => navigate(`/my-skills/${foundSkill.id}/offers`)}
        />
      </div>
    );
  }

  // if (skillId && !id)
  if (skillId) {
    if (!foundSkill) {
      navigate("/my-skills");
      return null;
    }

    return (
      <div className="offer-container">
        <OfferCard
          user={user}
          skills={[foundSkill]}
          onDelete={handleDelete}
          setEditingOfferId={setEditingOfferId}
          onEdit={handleEdit}
          onAddOffer={(newOffer) => {
            handleAddOffer(newOffer);
            navigate(`/my-skills/${newOffer.skill_id}/offers`);
          }}
        />

        <button
          onClick={() => navigate("/my-skills")}
          className="back-to-skills"
        >
          ← Back to My Skills
        </button>
      </div>
    );
  }

  return (
    <div className="offer-container">
      <div className="offer-header">
        {!showGeneralOfferForm && (
          <button
            onClick={() => {
              setShowGeneralOfferForm(true);
              navigate("/my-skills/new");
            }}
          >
            Add Offer
          </button>
        )}
      </div>

      {showGeneralOfferForm && (
        <OfferSkillForm
          user={user}
          skills={allSkills}
          onAddOffer={(newOffer) => {
            handleAddOffer(newOffer);
            navigate("/my-skills");
          }}
          onCancel={() => {
            setShowGeneralOfferForm(false);
            navigate("/my-skills");
          }}
        />
      )}

      <div className="user-skills-list">
        <h3>My Skills</h3>
        {user.skills.length === 0 ? (
          <strong>You do not have any Skills.</strong>
        ) : (
          user.skills.map((skill) => (
            <h4
              key={skill.id}
              onClick={() => navigate(`/my-skills/${skill.id}/offers`)}
            >
              {skill.name}
            </h4>
          ))
        )}
      </div>
    </div>
  );
}

export default SkillOffers;
