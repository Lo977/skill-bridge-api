import React from "react";

function Home({ user }) {
  return (
    <div
      style={{
        padding: "5rem 2rem",
        maxWidth: "700px",
        margin: "0 auto",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
        Welcome, {user.username}! 👋
      </h1>

      <p style={{ fontSize: "1.2rem", color: "#444", lineHeight: "1.6" }}>
        You’ve arrived at <strong>Skill Bridge</strong> a simple place to
        connect people through knowledge. Whether you're here to teach, to
        learn, or just to explore, we’re excited to have you. Share your skills,
        discover others', and build meaningful connections as you grow.
      </p>
    </div>
  );
}

export default Home;
