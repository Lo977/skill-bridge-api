import React, { useEffect, useState } from "react";
import "../styles/Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/skills")
      .then((r) => r.json())
      .then(setSkills)
      .catch((err) => {
        console.error("Failed to fetch skills:", err);
      });
  }, []);

  return (
    <div className="skills-container">
      <h2 className="skills-title">Skill Categories</h2>
      <ul className="skills-list">
        {skills.map((skill) => (
          <li key={skill.id} className="skill-item">
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
