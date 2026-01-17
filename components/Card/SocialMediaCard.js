import Image from "next/image";

export default function SocialMediaCard() {
  return (
    <div className=" max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Background Image */}
      <div className="relative">
        <Image
          src="https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Social Media Icons"
          width={400}
          height={200}
          className="w-full h-44 object-cover"
        />
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
          Social Media
        </div>
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center space-x-1">
          <span>3 min read</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Author and Date */}
        <div className="flex items-center space-x-2 mb-2">
          <Image
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Author"
            width={30}
            height={30}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-700">Lorri Warf</p>
            <p className="text-xs text-gray-500">Oct 21, 2024</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-md font-bold text-gray-800 leading-tight mb-2">
          Handling Negative Feedback: Maintaining Brand Reputation on Social
          Media
        </h3>
      </div>
    </div>
  );
}
