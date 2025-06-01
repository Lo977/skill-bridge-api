import React, { useEffect, useState } from "react";
import "../styles/Skill.css";
import AddSkillForm from "../components/AddSkillForm";

function Skills() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    fetch("/skills")
      .then((r) => r.json())
      .then(setSkills);
  }, []);
  return (
    <div className="skill-container">
      <AddSkillForm skills={skills} onSetSkills={setSkills} />

      {skills.map((skill) => (
        <h4 key={skill.id} className="title">
          {skill.name}
        </h4>
      ))}
    </div>
  );
}

export default Skills;
