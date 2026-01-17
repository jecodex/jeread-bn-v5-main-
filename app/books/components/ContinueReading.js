// app/components/ContinueReading.js
import Image from "next/image";
import React from "react";

const books = [
  {
    title: "Beginner’s Guide To Becoming A Professional Frontend Developer",
    author: "Prashant Kumar Singh",
    authorImage: "https://avatars.githubusercontent.com/u/123456789?v=4",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Beginner’s Guide To Becoming A Professional Frontend Developer",
    author: "Prashant Kumar Singh",
    authorImage: "https://avatars.githubusercontent.com/u/123456789?v=4",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Beginner’s Guide To Becoming A Professional Frontend Developer",
    author: "Prashant Kumar Singh",
    authorImage: "https://avatars.githubusercontent.com/u/123456789?v=4",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Beginner’s Guide To Becoming A Professional Frontend Developer",
    author: "Prashant Kumar Singh",
    authorImage: "https://avatars.githubusercontent.com/u/123456789?v=4",
    image: "https://picsum.photos/200/300",
  },
];

export default function ContinueReading() {
  return (
    <div className="p-4 max-w-7xl mr-[230px] mx-auto">
      <h2 className="text-xl font-bold mb-4">Continue Reading</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 w-[250px]"
          >
            <Image
              src={book.image}
              alt={book.title}
              width={250}
              height={40}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="font-semibold mt-2">{book.title}</h3>
            <div className="mt-2">
              <div className="bg-teal-500 h-1 rounded-full w-full"></div>
            </div>
            {/* Author Info */}
            <div className="mt-2 flex items-center">
              <Image
                src={book.authorImage} // Replace with the actual image URL
                alt="Prashant Kumar Singh"
                width={250}
                height={40}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">{book.author}</h3>
                <p className="text-gray-600">Software Developer</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
