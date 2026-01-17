"use client"
import React, { useState } from 'react';
import { Bell, ChevronRight, Activity, Video, Shield, Heart, Clock, FileText, Calendar, Bookmark, User, Home, Search, MessageSquare } from 'lucide-react';

export default function HealthcareApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const features = [
    { icon: Activity, title: 'Symptom Checker', subtitle: 'Check symptoms' },
    { icon: Video, title: 'Teleconsultation', subtitle: 'Video calls' },
    { icon: Shield, title: 'Insurance Assistance', subtitle: 'Coverage help' },
    { icon: Heart, title: 'Health Monitoring', subtitle: 'Track vitals' },
    { icon: Clock, title: 'Medication Reminders', subtitle: 'Never miss' },
    { icon: FileText, title: 'Scan your Report', subtitle: 'Upload & analyze' }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Leslie Alexander',
      specialty: 'Headaches And Migraines',
      avatar: '👩‍⚕️',
      rating: 4.9,
      experience: '8 years',
      price: '$120'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology Specialist',
      avatar: '👨‍⚕️',
      rating: 4.8,
      experience: '12 years',
      price: '$150'
    },
    {
      id: 3,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology Expert',
      avatar: '👨‍⚕️',
      rating: 4.9,
      experience: '10 years',
      price: '$130'
    }
  ];

  const renderHome = () => (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Hello,</h1>
          <h2 className="text-2xl font-semibold text-gray-900">Robertson!</h2>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Chat Assistant Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Discover Our Healthcare</h3>
                <p className="text-sm opacity-90">Chat Assistant</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Features</h3>
          <div className="grid grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Appointment Scheduling */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Appointment Scheduling</h3>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{doctor.name}</h4>
                    <p className="text-sm opacity-90 mb-2">{doctor.specialty}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span>★ {doctor.rating}</span>
                      <span>{doctor.experience}</span>
                      <span className="font-semibold">{doctor.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">{doctor.avatar}</div>
                    <Bookmark className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -mr-12 -mt-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="flex-1 bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Appointments</h2>
      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{doctor.avatar}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <p className="text-sm text-blue-600 mt-1">Today, 2:00 PM</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Join Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="flex-1 bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Find Doctors</h2>
      <div className="bg-white rounded-xl p-4 mb-6">
        <input
          type="text"
          placeholder="Search doctors, specialties..."
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-4xl mb-3">{doctor.avatar}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{doctor.name}</h4>
              <p className="text-xs text-gray-600 mb-2">{doctor.specialty}</p>
              <div className="flex items-center justify-center space-x-2 text-xs mb-3">
                <span className="text-yellow-500">★ {doctor.rating}</span>
                <span className="text-gray-500">{doctor.experience}</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="flex-1 bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h2>
      <div className="bg-white rounded-xl p-6 mb-6 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">Robertson</h3>
        <p className="text-gray-600">Patient ID: #12345</p>
      </div>
      
      <div className="space-y-3">
        {[
          { title: 'Medical Records', icon: FileText },
          { title: 'Insurance Info', icon: Shield },
          { title: 'Health Monitoring', icon: Heart },
          { title: 'Medication', icon: Clock },
          { title: 'Settings', icon: Activity }
        ].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 flex items-center space-x-4 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-blue-600" />
              </div>
              <span className="flex-1 font-medium text-gray-900">{item.title}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-sm mx-auto bg-white h-screen flex flex-col overflow-hidden shadow-2xl">
      {/* Status Bar */}
      <div className="bg-white px-6 py-2 flex items-center justify-between text-sm font-semibold">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-4 h-2 border border-black rounded-sm">
            <div className="w-3 h-1 bg-black rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'home' && renderHome()}
      {activeTab === 'appointments' && renderAppointments()}
      {activeTab === 'search' && renderSearch()}
      {activeTab === 'profile' && renderProfile()}

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-around">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'appointments', icon: Calendar, label: 'Appointments' },
            { id: 'search', icon: Search, label: 'Search' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 p-2 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
