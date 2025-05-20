import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Skills from "./pages/Skills";
import Offer from "./pages/Offer";

function AppRoutes({ user, onLogin }) {
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route
            path="/offers/:id?"
            element={<Offer user={user} setUser={onLogin} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/signup" element={<Signup onLogin={onLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
