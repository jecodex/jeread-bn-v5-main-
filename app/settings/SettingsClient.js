// app/settings/SettingsClient.js (Client Component)
"use client";
import { useState, useEffect } from 'react';
import { Settings, User, Bell, Moon, Globe, Lock, Shield, Mail, CreditCard, UserX, Download, Trash2, BookOpen, Bookmark, Share2, Type, Search, ChevronRight, Sun, MoreVertical } from 'lucide-react';
import SubscriptionSettings from '@/components/Modal/SubscriptionSettings';
import AccountSetting from '@/components/Modal/AccountSetting';
import NotificationSettings from '@/components/Modal/NotificationSettings';
import EmailSettings from '@/components/Modal/EmailSettings';

export default function SettingsClient() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Add Hind Siliguri font
  useEffect(() => {
    // Add Google Font link to head
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(linkElement);
    
    // Apply the font to body
    document.body.style.fontFamily = "'Hind Siliguri', sans-serif";
    
    // Check system preference for dark mode
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme');
      
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
    
    // Clean up
    return () => {
      if (document.head.contains(linkElement)) {
        document.head.removeChild(linkElement);
      }
    };
  }, []);
  
  // Toggle dark mode function
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };
  
  const tabs = [
    { id: 'account', label: 'Account Settings', icon: <User className="w-5 h-5" /> },
    // { id: 'privacy', label: 'Privacy Settings', icon: <Lock className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notification Settings', icon: <Bell className="w-5 h-5" /> },
    { id: 'theme', label: 'Theme Settings', icon: <Moon className="w-5 h-5" /> },
    // { id: 'language', label: 'Language Settings', icon: <Globe className="w-5 h-5" /> },
    // { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    // { id: 'email', label: 'Email Settings', icon: <Mail className="w-5 h-5" /> },
    // { id: 'subscription', label: 'Subscription Settings', icon: <CreditCard className="w-5 h-5" /> },
    // { id: 'block', label: 'Block List', icon: <UserX className="w-5 h-5" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSetting darkMode={darkMode} />;
      case 'theme':
        return <ThemeSettings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      case 'notifications':
        return <NotificationSettings />;

      default:
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{tabs.find(tab => tab.id === activeTab)?.label}</h2>
            <p className="text-gray-600 dark:text-gray-300">This feature is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
    
      {/* Main Content */}
      <div className="flex-1 p-8 pt-24">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center mb-2">
              <Settings className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Customize your account and application settings</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Home</a>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-teal-600 dark:text-teal-400">Settings</span>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Settings Navigation */}
            <div className="w-full lg:w-64">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="bg-teal-500 dark:bg-teal-600 p-4 flex items-center justify-between">
                  <h2 className="text-white font-medium">Settings Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden text-white hover:bg-teal-600 dark:hover:bg-teal-700 rounded-md p-1 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <div className={`p-2 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                  <div className="mb-4 px-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-teal-400"
                        placeholder="Search settings..."
                      />
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-1">
                      {tabs.map((tab) => (
                        <li key={tab.id}>
                          <button
                            onClick={() => {
                              setActiveTab(tab.id);
                              setIsMobileMenuOpen(false); // Close mobile menu when tab is selected
                            }}
                            className={`w-full flex items-center px-3 py-2.5 rounded-md text-left transition-all duration-200 ${
                              activeTab === tab.id
                                ? 'bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 font-medium border-l-4 border-teal-500 dark:border-teal-400'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <span className={`mr-3 ${activeTab === tab.id ? 'text-teal-600 dark:text-teal-400' : ''}`}>{tab.icon}</span>
                            <span>{tab.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              
              {/* Help Card */}
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow mt-4 p-4 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Need Help?</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Our support team is always ready to help you.</p>
                <a
                  href="mailto:support@jeread.com"
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200 flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support Team
                </a>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeSettings({ darkMode, toggleDarkMode }) {
  const [selectedTheme, setSelectedTheme] = useState(darkMode ? 'dark' : 'light');
  const [selectedColor, setSelectedColor] = useState('#45B09E');

  // Effect to update the button when darkMode changes from top-level toggle
  useEffect(() => {
    setSelectedTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);
  
  // Handle theme changes
  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    
    if (themeId === 'dark') {
      if (!darkMode) toggleDarkMode(); // Only toggle if not already dark
    } else if (themeId === 'light') {
      if (darkMode) toggleDarkMode(); // Only toggle if not already light
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
      description: 'Follow your device settings',
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
}