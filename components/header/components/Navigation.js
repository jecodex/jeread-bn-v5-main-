// components/Navigation.jsx
import { Bell, Search } from 'lucide-react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 block md:hidden">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side - Search Icon */}
        <div className="flex items-center justify-center w-12">
          <button className="text-gray-700 hover:text-blue-500">
            <Search size={24} />
          </button>
        </div>
        
        {/* Middle - Logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="font-bold text-xl text-gray-900">
            Jerid
          </Link>
        </div>
        
        {/* Right side - Notification Icon */}
        <div className="flex items-center justify-center w-12 relative">
          <button className="text-gray-700 hover:text-blue-500">
            <Bell size={24} />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;