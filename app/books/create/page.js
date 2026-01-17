import React from "react";
import CreateBook from "./CreateBook";
import { fetchProfileData } from "@/lib/fetchProfileData";

export default async function page() {
  const profileData = await fetchProfileData();
  const form = {
    title: "",
    content: "",
    tags: "",
    author: "",
    category: "",
  };
  return (
    <div>
      <div>
        <CreateBook form={form} profileData={profileData} />{" "}
      </div>
    </div>
  );
}
