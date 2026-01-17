// app/privacy/privacy-client.js (Client Component)
"use client"
import { useState, useEffect } from 'react';
import { AlertCircle, ChevronRight, Eye, FileText, Lock, Shield, User, Database, Globe, Clock, Mail, Settings, CheckCircle, Scale } from 'lucide-react';

export default function PrivacyClient({ lastUpdated, companyName }) {
  const [activeSection, setActiveSection] = useState('introduction');
  const [readingProgress, setReadingProgress] = useState(0);

  const navigationItems = [
    { id: 'introduction', label: 'Introduction', icon: Eye },
    { id: 'information-collection', label: 'Information Collection', icon: Database },
    { id: 'information-usage', label: 'How We Use Information', icon: FileText },
    { id: 'information-sharing', label: 'Information Sharing', icon: Globe },
    { id: 'data-security', label: 'Data Security', icon: Lock },
    { id: 'user-rights', label: 'Your Rights', icon: User },
    { id: 'cookies', label: 'Cookies Policy', icon: Settings },
    { id: 'children', label: 'Children\'s Privacy', icon: AlertCircle }
  ];

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

    // Reading progress tracker
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const personalInfoItems = [
    "Contact information (name, email address, phone number)",
    "Account credentials (username and password)",
    "Profile information (profile picture, bio, location)",
    "User-generated content (photos, quotes, notes, comments)",
    "Communications sent directly to us"
  ];

  const automaticInfoItems = [
    "Usage data (how you interact with our platform)",
    "Device information (hardware model, operating system)",
    "IP address and location information",
    "Cookies and similar tracking technologies",
    "Log data (access times, pages viewed, crash data)"
  ];

  const informationUsage = [
    "Providing, maintaining, and improving our services",
    "Creating and maintaining your account",
    "Processing your transactions",
    "Sending technical notices and security alerts",
    "Responding to comments, questions, and requests",
    "Personalizing your experience on our platform",
    "Monitoring and analyzing trends and activities",
    "Detecting and preventing fraudulent activities"
  ];

  const sharingCircumstances = [
    "With other users according to your privacy settings",
    "With service providers who perform services on our behalf",
    "With business partners for joint products or services",
    "In connection with corporate transactions",
    "To comply with legal obligations",
    "With your consent or at your direction"
  ];

  const securityMeasures = [
    "Encryption of sensitive data in transit and at rest",
    "Regular security assessments and vulnerability scanning",
    "Access controls and authentication mechanisms",
    "Staff training on security and privacy practices",
    "Incident response procedures"
  ];

  const userRights = [
    { right: "Access", description: "Request copies of your personal information" },
    { right: "Rectification", description: "Ask us to correct inaccurate information" },
    { right: "Erasure", description: "Ask us to erase your personal information" },
    { right: "Restriction", description: "Ask us to restrict processing" },
    { right: "Data Portability", description: "Get your information in machine-readable format" },
    { right: "Objection", description: "Object to our processing of your information" }
  ];

  const cookieTypes = [
    { type: "Essential Cookies", description: "Required for platform operation" },
    { type: "Analytical Cookies", description: "Help us analyze platform usage" },
    { type: "Functionality Cookies", description: "Enable personalization and preferences" },
    { type: "Targeting Cookies", description: "Record visits and track user behavior" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4">
        <nav className="flex items-center text-sm text-slate-500 mb-8">
          <a href="/" className="hover:text-purple-600 transition-colors">Home</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-slate-900">Privacy Policy</span>
        </nav>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 flex-shrink-0 order-2 lg:order-1">
            {/* Mobile/Tablet Horizontal Scroll Menu */}
            <div className="lg:hidden mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-purple-600" />
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
                            ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 shadow-md' 
                            : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
                        }`}
                      >
                        <IconComponent className={`h-4 w-4 mr-2 ${
                          activeSection === item.id ? 'text-purple-700' : 'text-slate-500'
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
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-purple-600" />
                  Table of Contents
                </h3>
                <div className="mt-2 text-sm text-slate-600 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Last updated: {lastUpdated}
                </div>
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
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 shadow-sm' 
                          : 'text-slate-700 hover:text-purple-700 hover:bg-purple-50'
                      }`}
                    >
                      <IconComponent className={`h-4 w-4 mr-3 transition-colors ${
                        activeSection === item.id 
                          ? 'text-purple-700' 
                          : 'text-slate-400 group-hover:text-purple-600'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                
                {/* Header */}
                <div className="text-center pb-8 border-b border-slate-200">
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
                  <p className="text-lg text-slate-600">
                    Your privacy is important to us. Learn how we collect, use, and protect your information.
                  </p>
                </div>

                {/* Introduction */}
                <section id="introduction">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Introduction</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed text-lg">
                      At <span className="font-bold text-purple-700">{companyName}</span>, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform and use our services.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-amber-900 mb-2">Please Read Carefully</h3>
                          <p className="text-amber-800 leading-relaxed">
                            If you do not agree with the terms of this privacy policy, please do not access our platform. We reserve the right to make changes to this Privacy Policy at any time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information Collection */}
                <section id="information-collection">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Information Collection</h2>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    We collect information that you provide directly to us when you register for an account, create content, or interact with our platform.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h3 className="font-bold text-blue-900 text-lg mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Personal Information
                      </h3>
                      <div className="space-y-3">
                        {personalInfoItems.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <h3 className="font-bold text-green-900 text-lg mb-4 flex items-center">
                        <Settings className="h-5 w-5 mr-2" />
                        Automatic Information
                      </h3>
                      <div className="space-y-3">
                        {automaticInfoItems.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information Usage */}
                <section id="information-usage">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">How We Use Information</h2>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    We use the information we collect for various purposes to provide and improve our services:
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {informationUsage.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h3 className="font-bold text-yellow-900 text-lg mb-3 flex items-center">
                      <Scale className="h-5 w-5 mr-2" />
                      Legal Basis for Processing
                    </h3>
                    <p className="text-yellow-800 leading-relaxed">
                      We process your information based on: (1) your consent; (2) contractual obligations; (3) legal compliance; (4) protection of vital interests; (5) public interest; and (6) our legitimate interests.
                    </p>
                  </div>
                </section>

                {/* Information Sharing */}
                <section id="information-sharing">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Information Sharing</h2>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    We may share information about you in the following circumstances:
                  </p>

                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
                    <div className="grid gap-4">
                      {sharingCircumstances.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Public Information Notice
                    </h3>
                    <p className="text-blue-800 leading-relaxed">
                      Information you choose to make public on our platform may be viewed by other users and could be collected by others. We cannot control how others use publicly available information.
                    </p>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Data Security</h2>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    We have implemented appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission can be guaranteed to be 100% secure.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-red-900 text-lg mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Our Security Measures
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {securityMeasures.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-100 border-l-4 border-slate-500 p-6 rounded-r-xl">
                    <h3 className="font-bold text-slate-900 mb-2">Your Responsibility</h3>
                    <p className="text-slate-700 leading-relaxed">
                      You are responsible for maintaining the secrecy of your password and account information, and for controlling access to your email communications.
                    </p>
                  </div>
                </section>

                {/* User Rights */}
                <section id="user-rights">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Your Rights</h2>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {userRights.map((item, index) => (
                      <div key={index} className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                        <h4 className="font-bold text-teal-900 mb-2">{item.right}</h4>
                        <p className="text-teal-800 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      Exercise Your Rights
                    </h3>
                    <p className="text-blue-800 leading-relaxed">
                      To exercise these rights, contact us using the details in the &quot;Contact Us&quot; section. We will respond within 30 days and may require identity verification.
                    </p>
                  </div>
                </section>

                {/* Cookies Policy */}
                <section id="cookies">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Cookies Policy</h2>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small data files stored on your device.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {cookieTypes.map((item, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                        <h4 className="font-bold text-indigo-900 mb-2">{item.type}</h4>
                        <p className="text-indigo-800 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <p className="text-slate-700 leading-relaxed">
                      You can configure your browser to refuse cookies, but this may limit some functionality. Learn more about managing cookies in your browser settings.
                    </p>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section id="children">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Children&apos;s Privacy</h2>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    Our platform is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="font-bold text-red-900 text-lg mb-3 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Important Notice
                    </h3>
                    <p className="text-red-800 leading-relaxed">
                      If you believe we have collected information from a child under 13, please contact us immediately at <span className="font-bold">privacy@jeread.com</span>. We will take steps to remove such information from our servers.
                    </p>
                  </div>
                </section>

                {/* Contact Section */}
                <section className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <Mail className="h-8 w-8 mr-4 text-purple-700" />
                    <h2 className="text-2xl font-bold text-purple-900">Contact Us</h2>
                  </div>
                  <p className="text-purple-700 text-lg mb-6">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-purple-900">Privacy Inquiries</h4>
                      <p className="text-purple-700">privacy@jeread.com</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-purple-900">Data Protection Officer</h4>
                      <p className="text-purple-700">dpo@jeread.com</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}