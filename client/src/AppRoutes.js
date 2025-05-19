import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function AppRoutes({ user, onLogin }) {
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
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
