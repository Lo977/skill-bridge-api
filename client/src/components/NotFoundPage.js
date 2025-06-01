// src/components/NotFoundPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/")}>← Go Home</button>
    </div>
  );
}

export default NotFoundPage;
