"use client";
import React, { useState } from 'react';
import { MapPin, Calendar, Palette, Cog, Fuel, Settings, Download, Heart, Share2, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function ModernCarListing() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const carImages = [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-[#43C3B9]">
                AJJALA
              </div>
              <nav className="hidden md:flex space-x-6">
                {['Home', 'All Cars', 'All Sonars', 'About', 'Contact', 'Car Fax', 'Our App'].map((item) => (
                  <a key={item} href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                    {item}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-slate-600 hover:text-[#43C3B9] transition-colors">
                ENGLISH
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
          <span>Home</span>
          <span>/</span>
          <span>Cars</span>
          <span>/</span>
          <span className="text-[#43C3B9] font-medium">2023 Volkswagen</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Title */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">2023 Volkswagen</h1>
                  <p className="text-slate-600 flex items-center">
                    <span className="text-sm bg-[#43C3B9] bg-opacity-10 text-[#43C3B9] px-2 py-1 rounded-full mr-2">Premium</span>
                    Brand: Volkswagen
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full transition-all duration-300 ${isLiked ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-[#43C3B9] hover:bg-opacity-10 hover:text-[#43C3B9] transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-slate-600 ml-1">(4.8)</span>
                </div>
                <span className="text-2xl font-bold text-[#43C3B9]">$32,500</span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <img 
                    src={carImages[currentImageIndex]} 
                    alt="Car"
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 hover:bg-white transition-all duration-200 shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 hover:bg-white transition-all duration-200 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {carImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Vehicle Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-[#43C3B9] hover:bg-opacity-5 transition-colors duration-200">
                    <div className="p-2 bg-[#43C3B9] bg-opacity-10 rounded-lg">
                      <Settings className="w-5 h-5 text-[#43C3B9]" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">VIN</p>
                      <p className="font-semibold text-slate-900">3VW2B7AJ7JM243643</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-[#43C3B9] hover:bg-opacity-5 transition-colors duration-200">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">State</p>
                      <p className="font-semibold text-slate-900">TSI</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-[#43C3B9] hover:bg-opacity-5 transition-colors duration-200">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Model Year</p>
                      <p className="font-semibold text-slate-900">2023</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-[#43C3B9] hover:bg-opacity-5 transition-colors duration-200">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Palette className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Color</p>
                      <p className="font-semibold text-slate-900">White - أبيض</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-[#43C3B9] hover:bg-opacity-5 transition-colors duration-200">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Fuel className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Engine Type</p>
                      <p className="font-semibold text-slate-900">Naturally Aspirated - تنفس طبيعي</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-[#43C3B9] hover:bg-opacity-5 transition-colors duration-200">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Cog className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Engine Size</p>
                      <p className="font-semibold text-slate-900">2.0L</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-[#43C3B9] hover:bg-opacity-5 transition-colors duration-200">
                    <div className="p-2 bg-[#43C3B9] bg-opacity-10 rounded-lg">
                      <Settings className="w-5 h-5 text-[#43C3B9]" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Gear Type</p>
                      <p className="font-semibold text-slate-900">Automatic - أوتوماتيك</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-[#43C3B9] hover:bg-opacity-5 transition-colors duration-200">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Imported From</p>
                      <p className="font-semibold text-slate-900">United States - أمريكا</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Inspection Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-[#43C3B9] bg-opacity-10 rounded-lg">
                  <Settings className="w-6 h-6 text-[#43C3B9]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Car Inspection Details</h2>
                  <p className="text-slate-600 text-sm">Comprehensive report for فولكسفاغن فولكسفاغن 2023</p>
                </div>
              </div>

              {/* Vehicle Overview */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-[#43C3B9] rounded-full mr-2"></div>
                  Vehicle Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#43C3B9] from-opacity-5 to-[#43C3B9] to-opacity-10 rounded-xl border border-[#43C3B9] border-opacity-20">
                    <p className="text-sm text-[#43C3B9] font-medium">Brand & Model</p>
                    <p className="font-bold text-slate-900">فولكسفاغن فولكسفاغن</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <p className="text-sm text-green-600 font-medium">Trim</p>
                    <p className="font-bold text-slate-900">TSI</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                    <p className="text-sm text-purple-600 font-medium">Color</p>
                    <p className="font-bold text-slate-900">white - أبيض</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100">
                    <p className="text-sm text-orange-600 font-medium">Motor Type</p>
                    <p className="font-bold text-slate-900">Naturally Aspirated - تنفس طبيعي</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                    <p className="text-sm text-teal-600 font-medium">Fuel Type</p>
                    <p className="font-bold text-slate-900">بانزين</p>
                  </div>
                </div>
              </div>

              {/* Damage Report */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Damage Report
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: 6, status: 'تبديل', color: 'red' },
                    { id: 5, status: 'تعديل بارد', color: 'yellow' },
                    { id: 1, status: 'صبغ + معجون', color: 'orange' },
                    { id: 2, status: 'تعديل بارد', color: 'yellow' },
                    { id: 3, status: 'تعديل بارد', color: 'yellow' },
                    { id: 4, status: 'تعديل بارد', color: 'yellow' }
                  ].map((item) => (
                    <div key={item.id} className={`p-3 rounded-xl border-l-4 ${
                      item.color === 'red' ? 'bg-red-50 border-red-500' :
                      item.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-orange-50 border-orange-500'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Part {item.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.color === 'red' ? 'bg-red-100 text-red-700' :
                          item.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chassis Inspection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Chassis Inspection
                </h3>
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Settings className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-bold text-green-800">Chassis Inspection Completed</h4>
                  </div>
                  <p className="text-green-700 mb-2">This vehicle's chassis has been inspected with no issues found.</p>
                  <p className="text-green-600 text-sm mb-3">The chassis inspection was completed and the car appears to be in good condition.</p>
                  <p className="text-green-800 font-medium">Vehicle ID: <span className="font-bold">3VW2B7AJ7JM243643</span></p>
                </div>
              </div>

              {/* Functional Inspection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-[#43C3B9] rounded-full mr-2"></div>
                  Functional Inspection
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-[#43C3B9] from-opacity-5 to-[#43C3B9] to-opacity-10 rounded-xl border border-[#43C3B9] border-opacity-20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">Air Conditioning (مكيف الهواء)</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Good</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">نظام ينظم درجة الحرارة داخل السيارة.</p>
                    <p className="text-green-600 font-medium text-sm">Status: Good</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-[#43C3B9] from-opacity-5 to-[#43C3B9] to-opacity-10 rounded-xl border border-[#43C3B9] border-opacity-20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">Engine (محرك)</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Good</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">المكون الرئيسي الذي يوفر الطاقة للسيارة.</p>
                    <p className="text-green-600 font-medium text-sm">Status: Good</p>
                  </div>
                </div>
              </div>

              {/* Interior Inspection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  Interior Inspection
                </h3>
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Settings className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-bold text-amber-800">لم يتم إجراء فحص المقصورة الداخلية</h4>
                  </div>
                  <p className="text-amber-700 mb-2">تم تخطي فحص المقصورة الداخلية لهذه السيارة أو لم يكتمل.</p>
                  <p className="text-amber-600 text-sm mb-3">لا تتوفر نتائج فحص للمقصورة الداخلية في الوقت الحالي.</p>
                  <p className="text-amber-800 font-medium">Vehicle ID: <span className="font-bold">3VW2B7AJ7JM243643</span></p>
                </div>
              </div>

              {/* Sonar Report */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-[#43C3B9] rounded-full mr-2"></div>
                  Sonar Report
                </h3>
                <div className="p-6 bg-gradient-to-br from-[#43C3B9] from-opacity-5 to-[#43C3B9] to-opacity-10 rounded-xl border border-[#43C3B9] border-opacity-20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-[#43C3B9] bg-opacity-10 rounded-lg">
                      <Settings className="w-5 h-5 text-[#43C3B9]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">عجلة</h4>
                      <p className="text-slate-600 text-sm">Comprehensive inspection report</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Print Report Card */}
            <div className="bg-gradient-to-br from-[#43C3B9] to-[#37A99B] rounded-2xl p-6 text-white shadow-xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Vehicle Report</h3>
                <p className="text-white text-opacity-80">Get detailed vehicle history and inspection report</p>
              </div>
              <button className="w-full bg-white text-[#43C3B9] font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105">
                Print Report
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#43C3B9] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#37A99B] transition-all duration-200 transform hover:scale-105">
                  Schedule Test Drive
                </button>
                <button className="w-full bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-xl hover:bg-slate-200 transition-all duration-200">
                  Get Financing
                </button>
                <button className="w-full bg-green-100 text-green-700 font-semibold py-3 px-4 rounded-xl hover:bg-green-200 transition-all duration-200">
                  Contact Dealer
                </button>
              </div>
            </div>

            {/* Dealer Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Dealer Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">Dealer</p>
                  <p className="font-semibold text-slate-900">Premium Auto Gallery</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="font-semibold text-slate-900">Abu Dhabi, UAE</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Rating</p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-slate-600 ml-1">(4.9)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}