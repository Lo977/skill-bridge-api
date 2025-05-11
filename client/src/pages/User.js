import { useParams } from "react-router-dom";
import "../styles/User.css";

function User({ user }) {
  const { id } = useParams();

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <h1 className="user-profile-title">{user.username}</h1>
        <p className="user-profile-detail">Email: {user.email}</p>
      </div>
    </div>
  );
}

export default User;
