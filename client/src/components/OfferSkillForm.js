import React, { useState, useEffect } from "react";

function OfferSkillForm({ user, onAddOffer }) {
  const [formData, setFormData] = useState({
    skill_id: "",
    title: "",
    description: "",
  });

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const offerData = { ...formData, user_id: user.id };
    fetch("/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(offerData),
    })
      .then((res) => res.json())
      .then((newOffer) => {
        onAddOffer(newOffer);
        setFormData({ skill_id: "", title: "", description: "" });
      });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="skill_id">Select Skill:</label>
      <select
        name="skill_id"
        value={formData.skill_id}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          -- Select a skill --
        </option>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.id}>
            {skill.name}
          </option>
        ))}
      </select>

      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit Offer</button>
    </form>
  );
}

export default OfferSkillForm;
