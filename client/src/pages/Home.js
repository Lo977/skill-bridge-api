import React, { useContext } from "react";
import logo from "../pages/logo2.png";
import "../styles/Home.css";
import UserContext from "../components/UserContext";

function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className="container">
      <img src={logo} alt="logo" className="logo" />
      <h2 className="title"> Hello, {user.username}</h2>
      <p className="description">
        Welcome to <strong>Skill Bridge</strong> where knowledge meets
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
