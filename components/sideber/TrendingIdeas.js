import Image from 'next/image';
import React from 'react';

export default function সুপারিশকৃত_বন্ধুরা() {
  const বন্ধুরা = [
     {
    name: 'মুহাম্মদ আরিফ হাসান',
    role: 'সফটওয়্যার ইঞ্জিনিয়ার',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  },
  {
    name: 'নুসরাত জাহান',
    role: 'ডিজিটাল মার্কেটিং স্পেশালিস্ট',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    name: 'আব্দুল্লাহ আল মাহমুদ',
    role: 'ডেটা অ্যানালিস্ট',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  },
  {
    name: 'সাদিয়া আফরিন',
    role: 'ইউআই / ইউএক্স ডিজাইনার',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
  }
  ];

  const পাদটীকা_লিংকগুলি = [
    { লেবেল: 'সম্পর্কে', হ্রেফ: '/about' },
    { লেবেল: 'সহায়তা', হ্রেফ: '/help' },
    { লেবেল: 'গোপনীয়তা ও শর্তাবলী', হ্রেফ: '/privacy' }
  ];

  return (
    <div className="bg-gray-50 flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-2xl  p-6 border border-gray-200">
        {/* শিরোনাম */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Follow People</h2>
        </div>

        {/* বন্ধুদের তালিকা */}
        <div className="space-y-5">
          {বন্ধুরা.map((বন্ধু, সূচক) => (
            <div 
              key={সূচক}
              className="flex items-center gap-4 group hover:bg-gray-50 rounded-xl p-2 -m-2 transition-colors cursor-pointer"
            >
              {/* প্রোফাইল ছবি */}
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                <Image
                  src={বন্ধু.ছবি}
                  alt={বন্ধু.নাম}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* নাম এবং পদ */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm text-gray-900 truncate">
                  {বন্ধু.নাম}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {বন্ধু.পদ}
                </p>
              </div>

              {/* অনুসরণ করুন বোতাম */}
              <button
                className="
                  px-3.5 
                  py-1.5
                  rounded-full 
                  border 
                  border-[#e5e5e5]
                  bg-white 
                  text-[#222]
                  hover:bg-[#f5f5f5]
                  text-xs 
                  font-medium 
                  transition-colors
                  flex-shrink-0
                "
                aria-label={`${বন্ধু.নাম} অনুসরণ করুন`}
              >
                Follow
              </button>

            </div>
          ))}
        </div>

        {/* পাদটীকা */}
        <div className="border-t border-gray-100 pt-6 mt-6 space-y-3">
          <p className="text-center text-xs text-gray-400">
            © ২০২৫ জেরিড। সর্বাধিকার সংরক্ষিত।
          </p>
          <div className="flex items-center justify-center gap-6">
            {পাদটীকা_লিংকগুলি.map((লিংক, সূচক) => (
              <a
                key={সূচক}
                href={লিংক.হ্রেফ}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                {লিংক.লেবেল}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


