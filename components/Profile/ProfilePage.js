"use client";
import Image from "next/image";
import React from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import useProfile from "@/utils/useProfile";

const ProfilePage = () => {
  const { user, loading, error } = useProfile();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="loader animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500 text-xl font-semibold">
          You are not logged in.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-60 relative">
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white"></div>
      </div>
      <div className="relative px-6 sm:px-12 pb-12">
        <div className="text-center">
          <Image
            src={user.profile_picture}
            alt="Profile"
            width={180}
            height={180}
            className="rounded-full mx-auto border-4 border-white shadow-xl -mt-24 object-cover"
          />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-xl text-indigo-600 font-semibold mt-2">
            {user.headline || "Professional Title"}
          </p>
        </div>

        {/* Additional Profile Details */}
        <div className="mt-8 space-y-8">
          <div className="flex items-center justify-center space-x-4">
            <FaMapMarkerAlt className="text-gray-400" />
            <span className="text-gray-600">
              {user.location || "Not specified"}
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              About Me
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {user.bio || "No bio available"}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.skills
                ? user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))
                : "Not specified"}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Experience
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaBriefcase className="text-indigo-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Current Position
                  </h3>
                  <p className="text-gray-600">Company Name</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaGraduationCap className="text-indigo-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-800">Education</h3>
                  <p className="text-gray-600">University Name</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center space-x-6">
          {["twitter", "linkedin", "github"].map(
            (platform) =>
              user[platform] && (
                <a
                  key={platform}
                  href={`https://${platform}.com/${
                    platform === "linkedin" ? "in/" : ""
                  }${user[platform]}`}
                  className="text-gray-400 hover:text-indigo-500 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform === "twitter" && <FaTwitter className="h-8 w-8" />}
                  {platform === "linkedin" && (
                    <FaLinkedin className="h-8 w-8" />
                  )}
                  {platform === "github" && <FaGithub className="h-8 w-8" />}
                </a>
              )
          )}
          <a
            href={`mailto:${user.email}`}
            className="text-gray-400 hover:text-indigo-500 transition-colors duration-300"
          >
            <FaEnvelope className="h-8 w-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
