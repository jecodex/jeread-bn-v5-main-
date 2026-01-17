"use client";
import { useEffect, useState } from "react";

const ProfileHeader = ({
  profileData,
  isFollowing,
  onFollowToggle,
  userId,
}) => {
  const [followersCount, setFollowersCount] = useState(
    profileData.followersCount
  );
  console.log("userId", userId);

  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/followers-count/${userId}`
        );
        const data = await response.json();
        console.log("followers count", data);
        setFollowersCount(data.followersCount);
      } catch (error) {
        console.error("Error fetching followers count:", error);
      }
    };

    if (userId) {
      fetchFollowersCount();
    }
  }, [userId]);

  const { name, followingCount, profile_picture, profession, bio } =
    profileData;

  // Log the profile picture URL to the console
  console.log("Profile Picture URL:", profile_picture);

  return (
    // add a button to go back to the profile page
    <div>
       {/* <div className="flex items-center mb-6">
      <img
        src={profile_picture || "/avatar.png"}
        alt="Profile Picture"
        className="rounded-full border-blue-500 mr-4"
        width={100}
        height={100}
      />
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <div className="flex space-x-3 text-sm">
          <p className="text-gray-600">{followersCount} অনুগামী</p>
          <p className="text-gray-600">{followingCount} জন অনুসরণ করছেন</p>
        </div>
        <div className="flex space-x-3 mt-2">
          <FollowButton userId={userId} />
        </div>
        <h1>{profession}</h1>
        {bio && <p className="text-gray-600 mt-2">{bio}</p>}
      </div>
    </div> */}
   </div>
  );
};

export default ProfileHeader;
