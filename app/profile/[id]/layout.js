import ProfileHighlights from "./ProfileHighlights";

// ExpertiseDetails Component
const ExpertiseDetails = ({ expertise }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
        এই ব্যক্তি জানে:
      </h2>
      {expertise.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {expertise.map((skill, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">কোনো দক্ষতার তথ্য নেই।</p>
      )}
    </div>
  );
};

export default async function NestedLayout({ children, params }) {
  const { id } = params;
  
  // Using environment variable for API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  
  // Fetch user profile data based on userId
  const profileResponse = await fetch(`${API_BASE_URL}/auth/user/${id}`);
  const profileData = await profileResponse.json(); // Get user profile data
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen mt-10">
      {children}
    </div>
  );
}
