"use client";
import Image from "next/image";
import Link from "next/link";

export default function StatusInfo({ profile }) {
  // If no profile is provided, show the login button
  if (!profile) {
    return null;
  }

  return (
    <div className="relative group">
      {/* Profile Image */}
      <div className="flex items-center space-x-4">
        <Image
          src={profile.profile_picture}
          alt={profile.name}
          width={200}
          height={200}
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Dropdown Menu */}
      <div className="absolute mt-2 right-0 w-40 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ul className="py-1 text-gray-700">
          <li className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer">
            {/* View Profile */}
            <td className="py-2 px-4 border-b">
              {profile.profile_picture ? (
                <Image
                  src={profile.profile_picture}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full border border-gray-300"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                  {profile.name.charAt(0)}{" "}
                  {/* Display first letter of the name */}
                </div>
              )}
            </td>
            <Link href={`/profile/${profile.username}`}>{profile.name}</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Settings
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
        </ul>
      </div>
    </div>
  );
}
