import { useParams } from "react-router-dom";

function User({ user }) {
  const { id } = useParams();

  // If needed, fetch user data here based on ID
  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      {/* any other profile info */}
    </div>
  );
}

export default User;
