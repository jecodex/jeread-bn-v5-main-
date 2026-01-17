// Book reels data - Robert Greene Quotes in Bengali (Updated with Bangladeshi usernames, female profiles, and user IDs)
const bookReelsData = [
  {
    _id: "bookreels1",
    type: "bookreels",
    userId: "user_001",
    userName: "taslima_rahman",
    userProfile: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "রবার্ট গ্রিনের ক্ষমতার গতিবিদ্যা সম্পর্কে জ্ঞান চিরকালীন। এই উক্তিটি কৌশল সম্পর্কে আমার দৃষ্টিভঙ্গি পরিবর্তন করেছে! 🔥",
    text: "আপনি অন্যদের ক্ষুদ্র অনুভূতি নিয়ে চিন্তা করে আপনার জীবন কাটাতে পারেন না।",
    backgroundImage: "https://images.unsplash.com/photo-1650545688700-70a8b4484984?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "ক্ষমতার ৪৮টি নিয়ম",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/48-laws-power.png",
      page: 145
    },
    likeCount: 892,
    commentCount: 127
  },
  {
    _id: "bookreels2",
    type: "bookreels",
    userId: "user_002",
    userName: "rashida_sultana",
    userProfile: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "এই কারণেই আমি গ্রিনের কাজ পছন্দ করি। তিনি অর্থহীন কথা কেটে ফেলেন এবং বিশ্ব আসলে কীভাবে কাজ করে তা বলেন 💯",
    text: "মানুষকে এমন বিকল্প দিন যা তারা যেটি বেছে নিক না কেন আপনার পক্ষেই আসে।",
    backgroundImage: "https://images.unsplash.com/photo-1627825169789-9c09ac10c252?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "প্রলোভনের শিল্প",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/art-seduction.png",
      page: 234
    },
    likeCount: 743,
    commentCount: 98
  },
  {
    _id: "bookreels3",
    type: "bookreels",
    userId: "user_003",
    userName: "fatima_khatun",
    userProfile: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "দক্ষতা অর্জনের পথ সহজ নয়, কিন্তু এটিই একমাত্র পথ যা প্রকৃত স্বাধীনতার দিকে নিয়ে যায় 🎯",
    text: "আপনার জীবনের মিশন, আপনার অনন্য কল্পনা শক্তিকে আবিষ্কার করুন।",
    backgroundImage: "https://images.unsplash.com/photo-1638781104942-0a1d58728963?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "দক্ষতা",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/mastery.png",
      page: 89
    },
    likeCount: 467,
    commentCount: 73
  },
  {
    _id: "bookreels4",
    type: "bookreels",
    userId: "user_004",
    userName: "nasreen_ahmed",
    userProfile: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "যুদ্ধের শিল্প শুধু যুদ্ধক্ষেত্রের জন্য নয়, জীবনের প্রতিটি দ্বন্দ্বের জন্য প্রযোজ্য ⚔️",
    text: "মহানতম বিজয় হল সেই যুদ্ধ যা লড়াই না করেই জেতা যায়।",
    backgroundImage: "https://plus.unsplash.com/premium_photo-1690031043933-4c441ea22a80?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "যুদ্ধের ৩৩টি কৌশল",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/33-strategies-war.png",
      page: 67
    },
    likeCount: 312,
    commentCount: 48
  },
  {
    _id: "bookreels5",
    type: "bookreels",
    userId: "user_005",
    userName: "salma_begum",
    userProfile: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "মানুষের প্রকৃতি বোঝা মানে নিজেকে এবং অন্যদের বোঝা। এটি জীবনের সবচেয়ে গুরুত্বপূর্ণ দক্ষতা 🧠",
    text: "আমরা সবাই আমাদের আবেগের দাস।",
    backgroundImage: "https://images.unsplash.com/photo-1689152487247-56735977b865?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "মানুষের প্রকৃতির নিয়ম",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/laws-human-nature.png",
      page: 145
    },
    likeCount: 589,
    commentCount: 94
  },
  {
    _id: "bookreels6",
    type: "bookreels",
    userId: "user_006",
    userName: "ruma_khatun",
    userProfile: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "ক্ষমতা একটি খেলা, এবং যারা নিয়মগুলি বোঝে না তারাই পরাজিত হয়। গ্রিন আমাদের সেই নিয়ম শেখান 👑",
    text: "কখনও আপনার মালিককে ছাড়িয়ে যাবেন না।",
    backgroundImage: "https://images.unsplash.com/photo-1583010616697-65692103dd39?q=80&w=961&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "ক্ষমতার ৪৮টি নিয়ম",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/48-laws-power.png",
      page: 203
    },
    likeCount: 423,
    commentCount: 67
  },
  {
    _id: "bookreels7",
    type: "bookreels",
    userId: "user_007",
    userName: "marium_islam",
    userProfile: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "প্রলোভন শুধু রোমান্সের বিষয় নয়, এটি প্রভাব এবং বিশ্বাসের শিল্প। জীবনের সবক্ষেত্রে প্রযোজ্য ✨",
    text: "মানুষ যা সহজলভ্য তা মূল্য দেয় না।",
    backgroundImage: "https://images.unsplash.com/photo-1659292862379-42dadcc515f6?q=80&w=851&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "প্রলোভনের শিল্প",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/art-seduction.png",
      page: 98
    },
    likeCount: 356,
    commentCount: 52
  },
  {
    _id: "bookreels8",
    type: "bookreels",
    userId: "user_008",
    userName: "sabina_akter",
    userProfile: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "দীর্ঘমেয়াদী চিন্তাভাবনা হল শক্তিশালী মানুষদের গোপন অস্ত্র। গ্রিন এটি পরিপূর্ণতার সাথে ব্যাখ্যা করেছেন 🎯",
    text: "দীর্ঘমেয়াদী লক্ষ্যে মনোনিবেশ করুন এবং অবিলম্বে সন্তুষ্টি বিলম্বিত করুন।",
    backgroundImage: "https://images.unsplash.com/photo-1679183449541-72c63b8db6a5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "দক্ষতা",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/mastery.png",
      page: 176
    },
    likeCount: 634,
    commentCount: 89
  },
  {
    _id: "bookreels9",
    type: "bookreels",
    userId: "user_009",
    userName: "hasina_parvin",
    userProfile: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "জীবন একটি যুদ্ধক্ষেত্র, এবং আমাদের কৌশলগত হতে হবে। গ্রিনের শিক্ষা এখানে অমূল্য ⚡",
    text: "প্রত্যেকের একটি দুর্বল দিক আছে, একটি অনিরাপদ অংশ আছে।",
    backgroundImage: "https://images.unsplash.com/photo-1679530229087-e36778e21e67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "যুদ্ধের ৩৩টি কৌশল",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/33-strategies-war.png",
      page: 134
    },
    likeCount: 445,
    commentCount: 71
  },
  {
    _id: "bookreels10",
    type: "bookreels",
    userId: "user_010",
    userName: "rahela_khatun",
    userProfile: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "খ্যাতি এবং উপস্থিতি আধুনিক যুগের সবচেয়ে গুরুত্বপূর্ণ সম্পদ। গ্রিন এটি নিখুঁতভাবে বুঝিয়েছেন 🌟",
    text: "আপনার খ্যাতি আপনার জীবনের মূলভিত্তি।",
    backgroundImage: "https://images.unsplash.com/photo-1679183449541-72c63b8db6a5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "ক্ষমতার ৪৮টি নিয়ম",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/48-laws-power.png",
      page: 267
    },
    likeCount: 712,
    commentCount: 103  
  },
  {
    _id: "bookreels11",
    type: "bookreels",
    userId: "user_011",
    userName: "najma_begum",
    userProfile: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "নীরবতাই সবচেয়ে শক্তিশালী অস্ত্র। কথা কম বলুন, বেশি শুনুন এবং পর্যবেক্ষণ করুন 🤫",
    text: "বেশি কথা বলা বিপদজনক। নীরবতার শক্তিকে ব্যবহার করুন।",
    backgroundImage: "https://images.unsplash.com/photo-1557395960-a95d57d8386a?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "ক্ষমতার ৪৮টি নিয়ম",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/48-laws-power.png",
      page: 84
    },
    likeCount: 524,
    commentCount: 76
  },
  {
    _id: "bookreels12",
    type: "bookreels",
    userId: "user_012",
    userName: "amina_sultana",
    userProfile: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "আবেগ নিয়ন্ত্রণ করা মানে নিজেকে নিয়ন্ত্রণ করা। এই শক্তিই আপনাকে অপরাজেয় করবে 💪",
    text: "আবেগ ক্ষমতার শত্রু।",
    backgroundImage: "https://images.unsplash.com/photo-1632890370909-e3af3d54247a?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "মানুষের প্রকৃতির নিয়ম",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/laws-human-nature.png",
      page: 192
    },
    likeCount: 678,
    commentCount: 95
  },
  {
    _id: "bookreels13",
    type: "bookreels",
    userId: "user_013",
    userName: "shireen_akter",
    userProfile: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "দক্ষতার পথে গুরু খুঁজুন এবং তাদের কাছ থেকে শিখুন। একাকী চলা কখনোই সফল হয় না 👥",
    text: "একজন গুরু খুঁজে নিন এবং তার সাথে শিক্ষানবিশী করুন।",
    backgroundImage: "https://plus.unsplash.com/premium_photo-1714023800301-83390690e1f0?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "দক্ষতা",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/mastery.png",
      page: 112
    },
    likeCount: 398,
    commentCount: 64
  },
  {
    _id: "bookreels14",
    type: "bookreels",
    userId: "user_014",
    userName: "yasmin_khatun",
    userProfile: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "রহস্য মানুষকে আকৃষ্ট করে। নিজেকে সম্পূর্ণভাবে প্রকাশ করবেন না, কিছু গোপন রাখুন 🎭",
    text: "মানুষকে অনুমান করতে দিন।",
    backgroundImage: "https://images.unsplash.com/photo-1683545493678-536df3422cf8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "প্রলোভনের শিল্প",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/art-seduction.png",
      page: 156
    },
    likeCount: 487,
    commentCount: 82
  },
  {
    _id: "bookreels15",
    type: "bookreels",
    userId: "user_015",
    userName: "kamrun_nahar",
    userProfile: "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "শত্রুদের কাছাকাছি রাখুন। তাদের পরিকল্পনা জানা থাকলে আপনি এগিয়ে থাকবেন 🎯",
    text: "আপনার শত্রুদের বন্ধুর মত ব্যবহার করুন।",
    backgroundImage: "https://images.unsplash.com/photo-1555681582-3857e9053929?q=80&w=683&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "যুদ্ধের ৩৩টি কৌশল",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/33-strategies-war.png",
      page: 201
    },
    likeCount: 612,
    commentCount: 108
  },
  {
    _id: "bookreels16",
    type: "bookreels",
    userId: "user_016",
    userName: "sultana_rajia",
    userProfile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "অহংকার পতনের মূল কারণ। বিনয়ী থাকুন এবং ক্রমাগত শিখতে থাকুন 🙏",
    text: "অহংকার আপনার পতনের দিকে নিয়ে যাবে।",
    backgroundImage: "https://images.unsplash.com/photo-1633685232311-670684bf656b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "মানুষের প্রকৃতির নিয়ম",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/laws-human-nature.png",
      page: 278
    },
    likeCount: 345,
    commentCount: 59
  },
  {
    _id: "bookreels17",
    type: "bookreels",
    userId: "user_017",
    userName: "farida_begum",
    userProfile: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "নিজের আবেগকে নিয়ন্ত্রণ করতে পারলেই অন্যদের নিয়ন্ত্রণ করা সম্ভব। এটিই প্রকৃত শক্তি 🔥",
    text: "নিজের উপর নিয়ন্ত্রণই সবচেয়ে বড় বিজয়।",
    backgroundImage: "https://images.unsplash.com/photo-1654546457371-6eb7f20ba0e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "দক্ষতা",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/mastery.png",
      page: 198
    },
    likeCount: 756,
    commentCount: 112
  },
  {
    _id: "bookreels18",
    type: "bookreels",
    userId: "user_018",
    userName: "rohima_khatun",
    userProfile: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "মৃত্যু মানুষের সবচেয়ে বড় ভয়। এই ভয়কে জয় করতে পারলে আর কোনো কিছুর ভয় থাকে না ☠️",
    text: "মৃত্যুর কথা চিন্তা করুন এবং জীবনকে পূর্ণভাবে বাঁচুন।",
    backgroundImage: "https://images.unsplash.com/photo-1565862548115-f92bce1e6114?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "মানুষের প্রকৃতির নিয়ম",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/laws-human-nature.png",
      page: 534
    },
    likeCount: 423,
    commentCount: 87
  },
  {
    _id: "bookreels19",
    type: "bookreels",
    userId: "user_019",
    userName: "bilkis_akter",
    userProfile: "https://images.unsplash.com/photo-1594824804732-5f084eedbd1c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "চরিত্র হল আপনার প্রকৃত পরিচয়। বাহ্যিক চেহারার চেয়ে চরিত্রের উপর বেশি গুরুত্ব দিন ✨",
    text: "আপনার চরিত্রই আপনার ভাগ্য নির্ধারণ করে।",
    backgroundImage: "https://images.unsplash.com/photo-1753186572735-ed6f8f07cacb?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "প্রলোভনের শিল্প",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/art-seduction.png",
      page: 287
    },
    likeCount: 567,
    commentCount: 91
  },
  {
    _id: "bookreels20",
    type: "bookreels",
    userId: "user_020",
    userName: "shahida_parvin",
    userProfile: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "সময়ের মূল্য বুঝুন এবং প্রতিটি মুহূর্তকে কাজে লাগান। সময়ই সবচেয়ে মূল্যবান সম্পদ ⏰",
    text: "সময় আপনার সবচেয়ে মূল্যবান সম্পদ, এটি নষ্ট করবেন না।",
    backgroundImage: "https://images.unsplash.com/photo-1734760381824-f52cb9960b9e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bookInfo: {
      title: "যুদ্ধের ৩৩টি কৌশল",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/33-strategies-war.png",
      page: 156
    },
    likeCount: 689,
    commentCount: 125
  },
  {
    _id: "bookreels21",
    type: "bookreels",
    userId: "user_021",
    userName: "shajid alam",
    userProfile: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userText: "সময়ের মূল্য বুঝুন এবং প্রতিটি মুহূর্তকে কাজে লাগান। সময়ই সবচেয়ে মূল্যবান সম্পদ ⏰",
    text: "মানুষ নয়, লক্ষ্যকে অনুসরণ করো",
    backgroundImage: "https://i.pinimg.com/736x/51/11/3c/51113cc9280765837d08cd0413631fa7.jpg",
    bookInfo: {
      title: "যুদ্ধের ৩৩টি কৌশল",
      author: "রবার্ট গ্রিন",
      image: "/book-covers/33-strategies-war.png",
      page: 156
    },
    likeCount: 689,
    commentCount: 125
  },
];

export default bookReelsData;
