import FollowButton from "./FollowButton"; // Follow Button Component

const ProfileDetails = ({ profileData }) => {
  const {
    id,
    name,
    profile_picture,
    profession,
    followersCount,
    followingCount,
  } = profileData;

  return (
    <div className="w-full md:w-2/3 mr-4 mt-20">
      <div className="flex items-center mb-6">
        <img
          src={profile_picture || "/avatar.png"} // Default to a placeholder if no picture
          alt="Profile Picture"
          className="rounded-full border-blue-500 mr-4"
          width={100}
          height={100}
        />
        <div>
          <h1 className="text-3xl font-bold">{name || id}</h1>
          <div className="flex space-x-3 text-sm">
            <p className="text-gray-600">{followersCount} অনুগামী</p>
            <p className="text-gray-600">{followingCount} জন অনুসরণ করছেন</p>
          </div>
          <div className="flex space-x-3 mt-2">
            <FollowButton
              profileId={id}
              isFollowing={false}
              followersCount={followersCount}
              followingCount={followingCount}
              userId={id}
            />
          </div>
        </div>
      </div>
      <h1>{profession}</h1>
    </div>
  );
};

export default ProfileDetails;
