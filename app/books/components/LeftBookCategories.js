import React from "react";
import {
  FaBook,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaPenFancy,
  FaUsers,
} from "react-icons/fa";

const categories = [
  { name: "ফিকশন", link: "/categories/fiction", icon: <FaBook /> },
  { name: "অবিজ্ঞান", link: "/categories/non-fiction", icon: <FaPenFancy /> },
  {
    name: "শিক্ষা",
    link: "/categories/education",
    icon: <FaChalkboardTeacher />,
  },
  { name: "প্রযুক্তি", link: "/categories/technology", icon: <FaLaptopCode /> },
  { name: "সাহিত্য", link: "/categories/literature", icon: <FaUsers /> },
];

export default function LeftBookCategories() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64">
      <h2 className="text-xl font-bold mb-4 text-teal-600">বইয়ের ক্যাটাগরি</h2>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index}>
            <a
              href={category.link}
              className="flex items-center p-2 rounded-lg hover:bg-teal-600 hover:text-white transition duration-300"
            >
              <span className="mr-2 text-teal-600">{category.icon}</span>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
