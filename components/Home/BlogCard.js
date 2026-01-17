import Image from "next/image";

// components/Recommend.js
export default function BlogCard() {
  const items = [
    {
      image: "/images/tagore.jpg", // Replace with the actual path to your image
      title: "Lorem Ipsum is simply dummy of the printing and typesetting",
      views: "20k",
      profileImage: "/images/profile.jpg", // Replace with the actual path to your profile image
    },
    {
      image: "/images/tagore.jpg",
      title: "Lorem Ipsum is simply dummy of the printing and typesetting",
      views: "20k",
      profileImage: "/images/profile.jpg",
    },
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recommented</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 border-b last:border-b-0 pb-4 last:pb-0"
          >
            <Image
              src={item.image}
              alt="Recommendation"
              width={50}
              height={50}
              className="w-24 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 line-clamp-2">
                {item.title}
              </p>
              <div className="flex items-center text-gray-500 text-xs mt-2">
                <Image
                  src={item.profileImage}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span>{item.views} দেখা হয়েছে</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
