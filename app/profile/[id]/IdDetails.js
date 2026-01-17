import ProfileDetails from "@/components/ProfileDetails";
import { fetchProfileData } from "@/lib/fetchProfileData"; // Importing the data fetching utility

// Server Component to fetch the profile data
export default async function ProfilePage({ params }) {
  const { id } = params;

  // Fetch the user profile data
  const profileData = await fetch(`http://localhost:5000/auth/user/${id}`).then(
    (res) => res.json()
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 mt-10">
      <div className="max-w-6xl mx-auto bg-white p-6 flex flex-col md:flex-row">
        {/* Pass the fetched profile data to the ProfileDetails component */}
        <ProfileDetails profileData={profileData} />
      </div>
    </div>
  );
}
