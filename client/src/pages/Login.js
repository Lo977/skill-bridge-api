import React, { useState } from "react";
import LoginForm from "../components/LoginForm";

import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      {showLogin ? (
        <>
          <h2 className="auth-title">Welcome Back</h2>
          <LoginForm onLogin={onLogin} />
          <div className="auth-switch">
            <span>Don't have an account?</span>
            <button
              onClick={() => {
                setShowLogin(false);
                // navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="auth-title">Create Your Account</h2>
          <Signup onLogin={onLogin} />
          <div className="auth-switch">
            <span>Already have an account?</span>
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
