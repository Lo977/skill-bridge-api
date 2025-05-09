import React, { useState } from "react";
import LoginForm from "../components/LoginForm";

import Signup from "./Signup";
function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <p>Login page</p>
      {showLogin ? (
        <LoginForm onLogin={onLogin} />
      ) : (
        <Signup onLogin={onLogin} />
      )}
    </>
  );
}

export default Login;
