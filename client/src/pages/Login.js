import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  return (
    <div>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <span>Don't have an account?</span>
          <button
            onClick={() => {
              setShowLogin(false);
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </>
      ) : (
        <>
          <Signup onLogin={onLogin} />
          <span>Already have an account?</span>
          <button onAbort={() => setShowLogin(true)}>Log in</button>
        </>
      )}
    </div>
  );
}

export default Login;
