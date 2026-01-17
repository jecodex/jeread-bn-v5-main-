// components/CommunityCard.js
import { fetchProfileData } from "@/lib/fetchProfileData";
import Postsbar from "./../Create/Postsbar";

const DevCommunityCard = async () => {
  const profile = await fetchProfileData();
  console.log("DevCommunityCard", profile);
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md border">
      <div className="text-sm font-semibold text-gray-600 mb-2">
        Quotes Community
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        Write and Share Your Quotes
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        {/* Join our platform to express your thoughts, share inspiring quotes, and
        connect with like-minded people.  */}
        বাংলায় লিখুন আপনার প্রিয় উক্তি এবং অনুপ্রাণিত করুন বিশ্বকে
      </p>
      {/* <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-transparent border border-blue-700 rounded-lg hover:bg-blue-100">
        Start Writing
      </button> */}
       <Postsbar posts={profile.profileData} users={profile.users} />
    </div>
  );
};

export default DevCommunityCard;
