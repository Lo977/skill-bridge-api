import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OfferCard from "../components/OfferCard";
import OfferSkillForm from "../components/OfferSkillForm";
import AddCategoryForm from "../components/AddCategoryForm";

function Offer({ user, setUser }) {
  const { id } = useParams();
  const [editId, setEditId] = useState(id || null);
  const [allSkills, setAllSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    fetch("/skills")
      .then((r) => r.json())
      .then(setAllSkills);
  }, []);

  function addOfferToExistingSkill(userSkills, newOffer) {
    return userSkills.map((skill) => {
      if (skill.id === newOffer.skill_id) {
        return {
          ...skill,
          offers: [...skill.offers, newOffer],
        };
      } else {
        return skill;
      }
    });
  }
  function addOfferAsNewSkill(userSkills, newOffer, allSkills) {
    const newSkill = allSkills.find((skill) => skill.id === newOffer.skill_id);
    const skillWithOffer = {
      ...newSkill,
      offers: [newOffer],
    };
    return [...userSkills, skillWithOffer];
  }

  function handleAddOffer(newOffer) {
    const existingSkill = user.skills.some(
      (skill) => skill.id === newOffer.skill_id
    );
    const updatedSkills = existingSkill
      ? addOfferToExistingSkill(user.skills, newOffer)
      : addOfferAsNewSkill(user.skills, newOffer, allSkills);
    setUser({ ...user, skills: updatedSkills });
    setShowForm(false);
  }
  function handleDelete(id) {
    fetch(`/offers/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        const updatedSkills = user.skills
          .map((skill) => ({
            ...skill,
            offers: skill.offers.filter((offer) => offer.id !== id),
          }))
          .filter((skill) => skill.offers.length > 0);
        setUser({ ...user, skills: updatedSkills });
        console.log(updatedSkills);
      }
    });
  }
  console.log(user);
  function handleEdit(updatedOffer) {
    const updatedSkills = user.skills.map((skill) =>
      skill.id === updatedOffer.skill_id
        ? {
            ...skill,
            offers: skill.offers.map((offer) =>
              offer.id === updatedOffer.id ? updatedOffer : offer
            ),
          }
        : skill
    );

    setUser({ ...user, skills: updatedSkills });
    setEditId(null);
  }

  return (
    <div>
      <AddCategoryForm skills={allSkills} onSetSkills={setAllSkills} />
      Offers
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Offer Skill"}
      </button>
      {showForm && (
        <OfferSkillForm
          user={user}
          skills={allSkills}
          onAddOffer={handleAddOffer}
        />
      )}
      {user.skills.length === 0 ? (
        <p>You have no offers yet.Start by adding one.</p>
      ) : (
        <OfferCard
          user={user}
          editId={editId}
          onDelete={handleDelete}
          setEditId={setEditId}
          onEdit={handleEdit}
          skills={allSkills}
          onAddOffer={handleAddOffer}
        />
      )}
    </div>
  );
}

export default Offer;
