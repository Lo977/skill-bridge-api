import React from "react";
import "../styles/Home.css"; // Make sure this path is correct
import logo from "../pages/logo1.png";

function Home({ user }) {
  return (
    <div className="home-container">
      <img src={logo} alt="Skill Bridge Logo" className="home-logo" />
      <h1 className="home-title">Hello, {user.username} 👋</h1>
      <p className="home-description">
        Welcome to <strong>Skill Bridge</strong> — where knowledge meets
        opportunity. This is more than just a platform it’s a space to grow,
        connect, and empower. Whether you're here to share your expertise, learn
        something new, or simply explore, you're in the right place. Discover
        talents, unlock potential, and build lasting connections as you bridge
        the gap between skill and success.
      </p>
    </div>
  );
}

export default Home;
