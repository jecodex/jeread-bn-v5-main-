'use client'
// app/terms/ClientTermsWrapper.js
import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

const ClientTermsWrapper = ({ navigationItems, content }) => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-10% 0px -60% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="lg:w-80 flex-shrink-0 order-2 lg:order-1">
      {/* Mobile/Tablet Horizontal Scroll Menu */}
      <div className="lg:hidden mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-teal-600" />
            Quick Navigation
          </h3>
          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm font-medium ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 shadow-md' 
                      : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-700'
                  }`}
                >
                  <IconComponent className={`h-4 w-4 mr-2 ${
                    activeSection === item.id ? 'text-gray-700' : 'text-slate-500'
                  }`} />
                  {index < 4 ? item.label : item.label.split(' ')[0]}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 sticky top-20 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-50 to-slate-50 p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-teal-600" />
            Table of Contents
          </h3>
        </div>
        <nav className="p-6 space-y-3">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                  activeSection === item.id 
                    ? 'bg-gray-200 text-gray-800' 
                    : 'text-slate-700 hover:text-teal-700 hover:bg-teal-50'
                }`}
              >
                <IconComponent className={`h-4 w-4 mr-3 transition-colors ${
                  activeSection === item.id 
                    ? 'text-gray-700' 
                    : 'text-slate-400 group-hover:text-teal-600'
                }`} />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ClientTermsWrapper;