"use client"
import React from 'react';
import { Phone, MapPin, Facebook, Instagram, MessageCircle, ExternalLink, Star, Clock, Award, Users } from 'lucide-react';

export default function ProfessionalCarShopCard() {
  const shopData = {
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop&crop=center",
    shopName: "Premium Auto Center",
    phoneNumber: "+880 1764 986 984",
    address: "House# 78/1A, Road No: 7/A, Dhanmondi, Dhaka-1205",
    location: "Dhanmondi, Dhaka",
    shopImage: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=300&fit=crop",
    socialMedia: {
      facebook: "https://facebook.com/premiumautocenter",
      instagram: "https://instagram.com/premiumautocenter",
      whatsapp: "https://wa.me/8801764986984"
    },
    rating: 4.8,
    totalReviews: 156,
    specialty: "BMW • Mercedes • Audi Specialist",
    workingHours: "9:00 AM - 7:00 PM",
    experience: "15+ Years",
    verified: true
  };

  const handleCall = () => {
    window.open(`tel:${shopData.phoneNumber}`, '_self');
  };

  const handleWhatsApp = () => {
    window.open(shopData.socialMedia.whatsapp, '_blank');
  };

  const handleLocation = () => {
    alert('Opening location in maps...');
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-50 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
      {/* Header Section */}
      <div className="relative h-52 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 translate-x-full animate-pulse"></div>
        </div>
        
        <img 
          src={shopData.shopImage} 
          alt={shopData.shopName}
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        
        {/* Logo with enhanced styling */}
        <div className="absolute top-6 left-6">
          <div className="w-18 h-18 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm p-1">
            <img 
              src={shopData.logo} 
              alt="Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Verified Badge */}
        {shopData.verified && (
          <div className="absolute top-6 right-6">
            <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
              <Award className="h-3 w-3" />
              <span>Verified</span>
            </div>
          </div>
        )}

      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        {/* Shop Information */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{shopData.shopName}</h2>
          <p className="text-slate-600 font-medium bg-slate-50 px-4 py-2 rounded-full text-sm inline-block">
            {shopData.specialty}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <Clock className="h-5 w-5 text-slate-600 mx-auto mb-1" />
            <p className="text-xs text-slate-600 font-medium">Working Hours</p>
            <p className="text-sm font-semibold text-slate-900">{shopData.workingHours}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <Users className="h-5 w-5 text-slate-600 mx-auto mb-1" />
            <p className="text-xs text-slate-600 font-medium">Happy Customers</p>
            <p className="text-sm font-semibold text-slate-900">500+</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Phone</p>
              <p className="text-slate-900 font-semibold">{shopData.phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mt-0.5">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Address</p>
              <p className="text-slate-900 font-medium text-sm leading-relaxed">{shopData.address}</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Connect With Us</p>
          <div className="flex space-x-3">
            <a 
              href={shopData.socialMedia.facebook}
              className="flex-1 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-5 w-5 text-white" />
            </a>
            <a 
              href={shopData.socialMedia.instagram}
              className="flex-1 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <a 
              href={shopData.socialMedia.whatsapp}
              className="flex-1 h-12 bg-green-600 rounded-xl flex items-center justify-center hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleCall}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </button>
            <button 
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Message</span>
            </button>
          </div>
          
          <button 
            onClick={handleLocation}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-200 hover:border-slate-300 hover:shadow-lg"
          >
            <MapPin className="h-4 w-4" />
            <span>Get Directions</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Professional Bottom Accent */}
      <div className="h-2 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900"></div>
    </div>
  );
}

// Desktop Professional Version
export function ProfessionalCarShopCardDesktop() {
  const shopData = {
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop&crop=center",
    shopName: "Premium Auto Center",
    phoneNumber: "+880 1764 986 984",
    address: "House# 78/1A, Road No: 7/A, Dhanmondi, Dhaka-1205",
    location: "Dhanmondi, Dhaka",
    shopImage: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=300&fit=crop",
    socialMedia: {
      facebook: "https://facebook.com/premiumautocenter",
      instagram: "https://instagram.com/premiumautocenter",
      whatsapp: "https://wa.me/8801764986984"
    },
    rating: 4.8,
    totalReviews: 156,
    specialty: "BMW • Mercedes • Audi Specialist",
    workingHours: "9:00 AM - 7:00 PM",
    experience: "15+ Years",
    verified: true
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-50 hover:shadow-3xl transition-all duration-500">
      <div className="md:flex">
        {/* Left side - Enhanced Image Section */}
        <div className="md:w-2/5 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <img 
            src={shopData.shopImage} 
            alt={shopData.shopName}
            className="w-full h-80 md:h-full object-cover opacity-60 mix-blend-overlay"
          />
          
          {/* Enhanced overlay with pattern */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
          
          {/* Logo */}
          <div className="absolute top-6 left-6">
            <div className="w-20 h-20 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm p-2">
              <img 
                src={shopData.logo} 
                alt="Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Verified Badge */}
          <div className="absolute top-6 right-6">
            <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
              <Award className="h-4 w-4" />
              <span>Verified Business</span>
            </div>
          </div>

          {/* Bottom Stats */}
          
        </div>

        {/* Right side - Content */}
        <div className="md:w-3/5 p-8 space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">{shopData.shopName}</h2>
            <p className="text-slate-600 font-medium bg-slate-50 px-4 py-2 rounded-full text-base inline-block">
              {shopData.specialty}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-slate-600" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Hours</p>
                  <p className="text-slate-900 font-semibold">{shopData.workingHours}</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-slate-600" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Customers</p>
                  <p className="text-slate-900 font-semibold">500+ Happy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Direct Line</p>
                <p className="text-lg text-slate-900 font-semibold">{shopData.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Location</p>
                <p className="text-slate-900 font-medium leading-relaxed">{shopData.address}</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Follow Us</p>
            <div className="flex space-x-4">
              <a href={shopData.socialMedia.facebook} className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110 shadow-lg">
                <Facebook className="h-6 w-6 text-white" />
              </a>
              <a href={shopData.socialMedia.instagram} className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-110 shadow-lg">
                <Instagram className="h-6 w-6 text-white" />
              </a>
              <a href={shopData.socialMedia.whatsapp} className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center hover:bg-green-700 transition-all duration-300 hover:scale-110 shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105">
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105">
                <MessageCircle className="h-5 w-5" />
                <span>Message</span>
              </button>
            </div>
            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 border border-slate-200 hover:border-slate-300 hover:shadow-lg">
              <MapPin className="h-5 w-5" />
              <span>Get Directions</span>
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Professional Bottom Accent */}
      <div className="h-2 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900"></div>
    </div>
  );
}