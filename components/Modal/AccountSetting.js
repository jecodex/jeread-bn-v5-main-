"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Settings, User, Bell, Moon, Globe, Lock, Shield, Mail, CreditCard, 
  UserX, Download, Trash2, Search, ChevronRight, Sun, Upload 
} from 'lucide-react';

import { useAuth } from "@/components/ContexProvider/ContextProvider";
import Image from 'next/image';

// Custom CheckCircle Icon Component
const CheckCircle = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Header Navigation Component
const HeaderNavigation = ({ darkMode, toggleDarkMode }) => (
  <div className="w-full fixed top-0 left-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10 p-4">
    <div className="flex justify-between items-center max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Settings</h1>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  </div>
);

// Page Header Component
const PageHeader = () => (
  <header className="">
   
  </header>
);

// Profile Picture Component
const ProfilePicture = ({ user }) => {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mr-6 mb-4 md:mb-0 relative group border-4 border-white dark:border-gray-800 shadow-lg">
      {user?.profilePicture ? (
        <Image 
          src={user.profilePicture} 
          alt={user.name || 'Profile'} 
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
          {getInitials(user?.name)}
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Upload className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

// Profile Header Component
const ProfileHeader = ({ user }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return '';
    }
  };

  const getUsername = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };

  return (
    <div className="flex flex-col md:flex-row items-center mb-8">
      <ProfilePicture user={user} />
      <div>
        <h3 className="font-medium text-gray-800 dark:text-white text-lg">
          {user?.name || 'User'}
        </h3>
        <p className="text-teal-600 dark:text-teal-400 text-sm mb-3">
          @{getUsername(user?.email)}
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-teal-500 dark:bg-teal-600 text-white rounded-md hover:bg-teal-600 dark:hover:bg-teal-700 transition duration-200 flex items-center shadow-sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200 shadow-sm">
            Remove
          </button>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">JPG, GIF or PNG. Maximum 1MB</p>
        {user?.createdAt && (
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Joined: {formatDate(user.createdAt)}
          </p>
        )}
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({ label, type = "text", defaultValue, hasCheckmark = false, disabled = false, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        className={`w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ${
          disabled ? 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : ''
        }`}
        defaultValue={defaultValue}
        disabled={disabled}
        {...props}
      />
      {hasCheckmark && (
        <div className="absolute right-3 top-2.5 text-teal-500 dark:text-teal-400">
          <CheckCircle className="w-5 h-5" />
        </div>
      )}
    </div>
  </div>
);

// Account Settings Component
const AccountSettings = ({ user }) => {
  const [activeSection, setActiveSection] = useState('personal');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'I love reading books and writing. I enjoy exploring different genres, especially fiction and novels.'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const getUsername = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let os = 'Unknown OS';
    let browser = 'Unknown Browser';
    
    // Detect OS
    if (userAgent.indexOf('Windows NT') !== -1) os = 'Windows';
    else if (userAgent.indexOf('Mac OS X') !== -1) os = 'Mac OS X';
    else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
    else if (userAgent.indexOf('Android') !== -1) os = 'Android';
    else if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) os = 'iOS';
    
    // Detect Browser
    if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome';
    else if (userAgent.indexOf('Firefox') !== -1) browser = 'Firefox';
    else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari';
    else if (userAgent.indexOf('Edg') !== -1) browser = 'Edge';
    else if (userAgent.indexOf('Opera') !== -1) browser = 'Opera';
    
    return { os, browser };
  };

  const getLastActive = () => {
    if (!user?.updatedAt) return 'a while ago';
    
    try {
      const lastUpdate = new Date(user.updatedAt);
      const now = new Date();
      const diffInMinutes = Math.floor((now - lastUpdate) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'just now';
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    } catch (error) {
      return 'a while ago';
    }
  };

  const getCurrentLocation = () => {
    // You can get this from IP geolocation API or user preferences
    // For now, returning default Dhaka location
    return 'Dhaka, Bangladesh';
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Account Settings</h2>
          <p className="text-gray-600 dark:text-gray-300">Update your profile information</p>
        </div>
        <div className="bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 px-3 py-1 rounded-full text-sm font-medium">
          {user?.googleId ? 'Google Account' : 'Verified Account'}
        </div>
      </div>
      

      <div className="p-6">
        <ProfileHeader user={user} />

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="Name" 
              defaultValue={formData.name} 
              hasCheckmark={!!user?.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <FormInput 
              label="Username" 
              defaultValue={getUsername(formData.email)} 
              disabled={!!user?.googleId}
            />
            <FormInput 
              label="Email" 
              type="email" 
              defaultValue={formData.email} 
              hasCheckmark={!!user?.email}
              disabled={!!user?.googleId}
            />
            <FormInput 
              label="Google ID" 
              defaultValue={user?.googleId || 'N/A'} 
              disabled={true}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            />
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100">Your Device</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getDeviceInfo().os} • {getDeviceInfo().browser} • {getCurrentLocation()} • {getLastActive()}
                </p>
                {user?.id && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    User ID: {user.id}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2.5 bg-teal-500 dark:bg-teal-600 text-white rounded-md hover:bg-teal-600 dark:hover:bg-teal-700 shadow-sm transition duration-200"
                  onClick={() => {
                    console.log('Saving user data:', formData);
                    // Here you would typically call your API to update user data
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Theme Settings Component
const ThemeSettings = ({ darkMode, toggleDarkMode }) => {
  const [selectedTheme, setSelectedTheme] = useState(darkMode ? 'dark' : 'light');
  const [selectedColor, setSelectedColor] = useState('#45B09E');

  useEffect(() => {
    setSelectedTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);
  
  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    
    if (themeId === 'dark') {
      if (!darkMode) toggleDarkMode();
    } else if (themeId === 'light') {  
      if (darkMode) toggleDarkMode();
    } else if (themeId === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark !== darkMode) toggleDarkMode();
    }
  };
  
  const themes = [
    { 
      id: 'light', 
      name: 'Light Mode', 
      description: 'Standard light interface',
      preview: (
        <div className="bg-white border border-gray-200 rounded-md p-2 shadow-sm">
          <div className="h-2 w-12 bg-gray-200 rounded mb-2"></div>
          <div className="h-2 w-16 bg-gray-100 rounded"></div>
        </div>
      )
    },
    { 
      id: 'dark', 
      name: 'Dark Mode', 
      description: 'Dark theme - suitable for night use',
      preview: (
        <div className="bg-gray-800 border border-gray-700 rounded-md p-2 shadow-sm">
          <div className="h-2 w-12 bg-gray-600 rounded mb-2"></div>
          <div className="h-2 w-16 bg-gray-700 rounded"></div>
        </div>
      )
    },
    { 
      id: 'system', 
      name: 'System Default', 
      description: 'According to your device settings',
      preview: (
        <div className="bg-gradient-to-r from-white to-gray-800 border border-gray-300 rounded-md p-2 shadow-sm">
          <div className="h-2 w-12 bg-gradient-to-r from-gray-200 to-gray-600 rounded mb-2"></div>
          <div className="h-2 w-16 bg-gradient-to-r from-gray-100 to-gray-700 rounded"></div>
        </div>
      )
    }
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Theme Settings</h2>
        <p className="text-gray-600 dark:text-gray-300">Change the application theme according to your preference</p>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Theme Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {themes.map((theme) => (
            <div 
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`border dark:border-gray-700 rounded-lg p-4 cursor-pointer transition-all ${
                selectedTheme === theme.id 
                  ? 'border-teal-500 dark:border-teal-400 bg-teal-50 dark:bg-teal-900/30 ring-2 ring-teal-500 dark:ring-teal-400 ring-opacity-50' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800'
              }`}
            >
              <div className="mb-3">{theme.preview}</div>
              <h4 className="font-medium text-gray-800 dark:text-gray-100">{theme.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{theme.description}</p>
            </div>
          ))}
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Accent Color</h3>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 mb-4">
            {['#45B09E', '#3B82F6', '#EC4899', '#F59E0B', '#10B981', '#6366F1'].map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full transition-all ${
                  selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 dark:ring-offset-gray-800' : ''
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Custom Color:</span>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-8 h-8 rounded overflow-hidden cursor-pointer"
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-end">
          <button className="px-4 py-2 bg-teal-500 dark:bg-teal-600 text-white rounded-md hover:bg-teal-600 dark:hover:bg-teal-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Settings Page Component
const AccountSetting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  
  // Get user data from auth context
  const { googleUser } = useAuth();
  const userId = useMemo(() => googleUser?.id || "anonymous", [googleUser?.id]);
  
  useEffect(() => {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(linkElement);
    
    document.body.style.fontFamily = "'Inter', sans-serif";
    
    if (typeof window !== 'undefined') {
      const savedTheme = darkMode ? 'dark' : 'light';
      
      if (savedTheme === 'dark' || 
         (savedTheme !== 'light' && 
          window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    }
    
    return () => {
      if (document.head.contains(linkElement)) {
        document.head.removeChild(linkElement);
      }
    };
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <HeaderNavigation darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-5xl mx-auto ">
          <PageHeader />
          <AccountSettings user={googleUser} />
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
