import React, { useEffect, useState } from "react";

function Skills() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    fetch("/skills")
      .then((r) => r.json())
      .then(setSkills);
  }, []);
  return (
    <div>
      Skills
      {skills.map((skill) => (
        <h4 key={skill.id}>{skill.name}</h4>
      ))}
    </div>
  );
}

export default Skills;
