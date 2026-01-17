// components/ProfileCard.js
const ProfileCard = ({ user }) => (
  <div className="bg-white p-4 border rounded shadow">
    <h2 className="text-xl font-semibold">Welcome, {user.displayName}!</h2>
    <p>Email: {user.email}</p>
  </div>
);

export default ProfileCard;
