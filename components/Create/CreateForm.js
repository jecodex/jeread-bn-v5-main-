import React from "react";
import { fetchProfileData } from "@/lib/fetchProfileData";
import ProfileInfo from "../profile/ProfileInfo";
import Postsbar from "./Postsbar";
import StatusInfo from "../profile/StatusInfo";

const CreateForm = async () => {
  const profile = await fetchProfileData();
  // console.log("profile", profile);

  return (
    <div
      className="flex flex-col max-w-2xl mt-4  px-2 mx-auto w-full gap-4 p-4 bg-white rounded-lg 
    shadow-sm"
    >
      <div className="flex items-center gap-2">
        {/* <ProfileInfo profile={profile.profileData} /> */}
        {/* <StatusInfo profile={profile.profileData} /> */}
        <Postsbar posts={profile.profileData} />
      </div>
    </div>
  );
};

export default CreateForm;
