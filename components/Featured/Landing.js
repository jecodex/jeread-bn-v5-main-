"use client";
import React, { useState, useEffect } from 'react';

const JeReadLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      title: 'লেখালেখিতে পুরস্কার',
      description: 'প্রতিটি মানসম্পন্ন লেখার জন্য আকর্ষণীয় পুরস্কার এবং প্রণোদনা পান। আপনার দক্ষতার মূল্যায়ন পান এবং অতিরিক্ত আয়ের সুযোগ লাভ করুন।',
      engagement: '২,৫০০+',
      icon: '🏆',
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'শিক্ষামূলক কন্টেন্ট তৈরি',
      description: 'জ্ঞানভিত্তিক লেখা তৈরি করুন যা হাজারো পাঠকের উপকারে আসবে। আপনার অভিজ্ঞতা ভাগ করে নিন এবং সমাজে ইতিবাচক পরিবর্তন আনুন।',
      engagement: '৫,২০০+',
      icon: '📚',
      color: 'from-[#45B09E] to-teal-600'
    },
    {
      title: 'সক্রিয় লেখক সম্প্রদায়',
      description: 'দেশের সেরা লেখকদের সাথে যুক্ত হয়ে আপনার দক্ষতা বৃদ্ধি করুন। নেটওয়ার্কিং এর সুযোগ পান এবং পেশাগত উন্নতি করুন।',
      engagement: '৩,৪০০+',
      icon: '👥',
      color: 'from-emerald-500 to-[#45B09E]'
    }
  ];

  const MockPost = ({ title, engagement, sponsored, brand, brandColor }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${brandColor} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
            {brand.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 font-medium">{brand}</span>
            <span className="text-xs bg-gradient-to-r from-[#45B09E]/20 to-teal-100 text-[#45B09E] px-2 py-1 rounded-full font-medium">স্পনসরড</span>
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-4 leading-relaxed text-lg">{title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1 bg-[#45B09E]/10 px-3 py-1 rounded-full">
            <span className="text-[#45B09E] font-bold">▲</span>
            <span className="font-medium">{engagement}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-[#45B09E] transition-colors p-2 hover:bg-[#45B09E]/10 rounded-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#45B09E]/5">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/20' : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-3xl font-bold">
                <span className="bg-[#45B09E] bg-clip-text text-transparent">JeRead</span>
                <span className="text-gray-600 font-light ml-3 text-lg">for Writers</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-100">
                বিজ্ঞাপন
              </button>
              <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-100">
                শিক্ষা
              </button>
              <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-100">
                সাপোর্ট
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-[#45B09E] to-teal-600 hover:from-[#3a9486] hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                শুরু করুন
              </button>
              
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#45B09E]/10 via-indigo-50/30 to-purple-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center bg-gradient-to-r from-[#45B09E]/20 to-teal-100 text-[#45B09E] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-[#45B09E] rounded-full mr-2"></span>
                বাংলাদেশের #১ লেখক প্ল্যাটফর্ম
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
               আপনার লেখা সংযুক্ত করুন</h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
                প্রতি মাসে <strong className="text-[#45B09E] font-semibold">৪০০+ হাজার</strong> অনন্য পাঠকের সাথে আপনার লেখা 
                সংযুক্ত করুন যারা গুণগত সমাধান খুঁজছেন।
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="group bg-gradient-to-r from-[#45B09E] to-teal-600 hover:from-[#3a9486] hover:to-teal-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center justify-center">
                    বিশেষজ্ঞের সাথে যোগাযোগ
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                <button className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-10 py-4 rounded-xl font-medium transition-all duration-300">
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 000-6h-1m1 6V4a3 3 0 112 3M9 10h1a3 3 0 000 6H9m1-6a3 3 0 102-3M9 16v-5.5a2.5 2.5 0 00-5 0V16M13 16v-5.5a2.5 2.5 0 015 0V16" />
                    </svg>
                    শুরু করুন
                  </span>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">৯৮%</div>
                  <div className="text-sm text-gray-600">সন্তুষ্ট লেখক</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">৫০০+</div>
                  <div className="text-sm text-gray-600">দৈনিক পোস্ট</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">২৪/৭</div>
                  <div className="text-sm text-gray-600">সাপোর্ট</div>
                </div>
              </div>
            </div>

            {/* Right Content - Mock Interface */}
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-lg mx-auto lg:mx-0 transform hover:scale-105 transition-transform duration-500">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">ট্রেন্ডিং পোস্ট</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <MockPost 
                  title="আপনি কেবল তখনই গরীব, যখন আপনি চেষ্টা করা বন্ধ করে দেন"
                  engagement="১.৫K"
                  sponsored="প্রমোটেড বাই"
                  brand="হোমস্ট্যাপ"
                  brandColor="bg-gradient-to-br from-[#45B09E] to-teal-600"
                />
               
              </div>
              
              {/* Floating elements */}
              
             
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-[#45B09E]/20 text-[#45B09E] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-[#45B09E] rounded-full mr-2"></span>
              আমাদের বৈশিষ্ট্য
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              কেন <span className="bg-gradient-to-r from-[#45B09E] to-teal-600 bg-clip-text text-transparent">JeRead</span> বেছে নিবেন?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light">
              আমাদের প্ল্যাটফর্মে লেখকরা তাদের জ্ঞান শেয়ার করে পুরস্কার অর্জন করেন এবং 
              পেশাগত উন্নতি সাধন করেন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100 hover:border-gray-200 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6 text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                      <div className={`px-3 py-1 bg-gradient-to-r ${feature.color} text-white text-sm font-bold rounded-full shadow-sm`}>
                        {feature.engagement}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed font-light">
                      {feature.description}
                    </p>
                    
                    <div className="mt-6">
                      <button className="text-[#45B09E] hover:text-[#3a9486] font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                        আরও জানুন
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-24 bg-gradient-to-br from-[#45B09E]/5 via-teal-50/50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#45B09E]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center bg-[#45B09E]/20 text-[#45B09E] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#45B09E] rounded-full mr-2"></span>
            বিশেষ অফার
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            আজই <span className="bg-gradient-to-r from-[#45B09E] to-teal-600 bg-clip-text text-transparent">JeRead</span> এর সাথে যুক্ত হন
          </h2>
          <p className="text-xl text-gray-600 mb-16 font-light max-w-2xl mx-auto">
            মাত্র ৳৯০০০ টাকায় প্রিমিয়াম লেখক হিসেবে আপনার পেশাদার যাত্রা শুরু করুন
          </p>

          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-bl-xl text-sm font-bold">
              সীমিত সময়
            </div>
            
            <div className="mb-8">
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-gray-500 text-xl line-through mr-3">৳১২,০০০</span>
                <span className="text-5xl font-bold bg-gradient-to-r from-[#45B09E] to-teal-600 bg-clip-text text-transparent">৳৯০০০</span>
              </div>
              <div className="text-gray-500 font-light">একবারে পেমেন্ট • ২৫% ছাড়</div>
            </div>
            
            <ul className="text-left space-y-4 mb-10">
              <li className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-[#45B09E] to-teal-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">অগ্রাধিকার সাপোর্ট ও পরামর্শ</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-[#45B09E] to-teal-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">মাসিক এক্সক্লুসিভ ওয়ার্কশপ</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-[#45B09E] to-teal-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">এনালিটিক্স ও পারফরমেন্স রিপোর্ট</span>
              </li>
            </ul>

            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full bg-gradient-to-r from-[#45B09E] to-teal-600 hover:from-[#3a9486] hover:to-teal-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
            >
              <span className="flex items-center justify-center">
                এখনই অর্ডার করুন
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            
            <p className="text-sm text-gray-500 mt-4 font-light">
              ৩০ দিনের মানি-ব্যাক গ্যারান্টি সহ
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-semibold text-gray-900 mb-1">দ্রুত শুরু</div>
              <div className="text-sm text-gray-600">২৪ ঘণ্টার মধ্যে অ্যাকাউন্ট সক্রিয়</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold text-gray-900 mb-1">নিশ্চিত আয়</div>
              <div className="text-sm text-gray-600">প্রতিটি কোয়ালিটি পোস্টে রিওয়ার্ড</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-gray-900 mb-1">টার্গেট অডিয়েন্স</div>
              <div className="text-sm text-gray-600">আপনার নিশ অনুযায়ী পাঠক</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              আমাদের লেখকরা কী বলছেন?
            </h2>
            <p className="text-xl text-gray-600 font-light">
              সফল লেখকদের অভিজ্ঞতা
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  র
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">রাহুল আহমেদ</div>
                  <div className="text-sm text-gray-600">টেক রাইটার</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                &quot;JeRead আমার লেখালেখির ক্যারিয়ার পরিবর্তন করে দিয়েছে। এখানে আমি শুধু লিখিই না, ভালো পুরস্কারও পাই।&quot;
              </p>
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  স
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">সাবিনা খাতুন</div>
                  <div className="text-sm text-gray-600">শিক্ষা বিশেষজ্ঞ</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                &quot;অসাধারণ প্ল্যাটফর্ম! এখানে আমার শিক্ষামূলক কন্টেন্ট হাজারো মানুষের কাজে লাগছে।&quot;
              </p>
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  ম
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">মাহবুব হাসান</div>
                  <div className="text-sm text-gray-600">ব্যবসা পরামর্শক</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                &quot;JeRead এ যোগ দেওয়ার পর আমার পাঠক সংখ্যা দ্বিগুণ হয়েছে. দারুণ সাপোর্ট পাই এখানে.&quot;
              </p>
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="text-3xl font-bold mb-6">
                <span className="bg-[#45B09E] bg-clip-text text-transparent">JeRead</span>
                <span className="text-gray-400 font-light ml-3">for Writers</span>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed font-light max-w-lg">
                বাংলাদেশের সবচেয়ে বড় এবং বিশ্বস্ত লেখক ও পাঠক সম্প্রদায়। 
                আপনার জ্ঞান শেয়ার করুন, পুরস্কার জিতুন এবং পেশাগত উন্নতি করুন।
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.3.16.67.16.97 0L20 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">ইমেইল</div>
                    <div className="text-blue-400 hover:text-blue-300 cursor-pointer">support@jeread.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">ফোন</div>
                    <div className="text-emerald-400 hover:text-emerald-300 cursor-pointer">+8801910888872</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg text-white">পণ্য ও সেবা</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">বিজ্ঞাপন সেবা</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">শিক্ষামূলক কন্টেন্ট</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">ব্যবসায়িক সমাধান</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">এপিআই সেবা</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg text-white">সাপোর্ট ও সাহায্য</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">সাহায্য কেন্দ্র</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">যোগাযোগ করুন</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">গোপনীয়তা নীতি</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">ব্যবহারের শর্ত</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 font-light mb-4 md:mb-0">
                &copy; ২০২৫ JeRead, Inc. সকল অধিকার সংরক্ষিত।
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.348-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
     
    </div>
  );
};

export default JeReadLandingPage;