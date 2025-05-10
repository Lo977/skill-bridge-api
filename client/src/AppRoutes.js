import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import User from "./pages/User";

function AppRoutes({ user, onLogin }) {
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/users" element={<User />} />
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
