// app/about/page.js
import { BookOpen, Heart, Users, Rocket, Globe, Facebook, Instagram, Linkedin, QrCode, Smartphone, Share2 } from 'lucide-react';
import Image from 'next/image';

// Static metadata
export const metadata = {
  title: "About Jeread - Social Reading Platform by Rakib Hasan Shawon",
  description: "Learn about Jeread, a community-driven social reading platform founded by Rakib Hasan Shawon where readers share book experiences, thoughts, and life insights.",
  keywords: ["Jeread", "social reading", "book community", "Rakib Hasan Shawon", "book reviews", "reading platform", "literature community"],
  authors: [{ name: "Rakib Hasan Shawon" }],
  creator: "Rakib Hasan Shawon",
  publisher: "Jeread",
  category: "Education",
  
  // Open Graph
  openGraph: {
    title: "About Jeread - Social Reading Platform",
    description: "Discover Jeread, where literature meets life. Founded by Rakib Hasan Shawon, it's a community-driven platform for readers to share experiences and connect.",
    url: "https://www.jeread.com/about",
    siteName: "Jeread",
    images: [
      {
        url: "https://www.jeread.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jeread - Social Reading Platform"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "About Jeread - Social Reading Platform",
    description: "Discover Jeread, where literature meets life. A community-driven platform for readers to share experiences and connect.",
    images: ["https://www.jeread.com/twitter-image.jpg"],
    creator: "@shawonetc"
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: "https://www.jeread.com/about"
  },
  
  // Verification
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code"
  }
}

const AboutPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Jeread",
    "url": "https://www.jeread.com",
    "description": "Jeread is a social reading platform founded by Rakib Hasan Shawon where readers share book-related experiences, thoughts, and insights.",
    "creator": {
      "@type": "Person",
      "name": "Rakib Hasan Shawon",
      "sameAs": [
        "https://www.facebook.com/shawonetc",
        "https://www.instagram.com/shawonetc",
        "https://www.linkedin.com/in/shawonetc"
      ]
    }
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
        {/* Hero Section */}
        <div className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-100 rounded-full mb-6">
             {/* logo */}
             <Image
              src="https://jeread.com/favicon.ico"
              alt="Jeread Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
            </div>
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              About Jeread
            </h1>
            <div className="w-24 h-1 bg-[#45B09E] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A community-driven social reading platform where literature meets life, 
              founded by <span className="text-[#45B09E] font-semibold">Rakib Hasan Shawon</span>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                <strong className="text-gray-900">Jeread.com</strong> is a social reading platform founded by 
                <strong className="text-[#45B09E]"> Rakib Hasan Shawon</strong>. This platform aims to create 
                a new kind of experience for readers, where they can not only read books but also share their 
                personal experiences, thoughts, and life insights. Jeread is more than just a book review site; 
                it is a community-driven space where readers can connect and learn from each other&apos;s experiences.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Purpose */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Purpose of the Platform</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The vision of Rakib Hasan Shawon was to create a platform where readers could share not just 
                their thoughts on books but also their emotions and life lessons. The primary goal of Jeread 
                is to foster social connections and knowledge exchange among readers.
              </p>
            </div>

            {/* Core Features */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#45B09E]" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Core Features</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#45B09E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Share Personal Experiences:</strong> Express how books impact you emotionally and intellectually</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#45B09E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Discussion & Commentary:</strong> Engage in deep discussions and reflections</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#45B09E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Build Community:</strong> Connect and learn from fellow readers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Future Plans & Summary */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Future Plans */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Rocket className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Future Plans</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Mobile App Development</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Book Club Feature</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">AI-Based Recommendation System</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-[#45B09E]" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">In Summary</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Jeread, founded by Rakib Hasan Shawon, is a place for readers to share their insights 
                and connect through literature and life. It represents the future of social reading, 
                where books become bridges between hearts and minds.
              </p>
            </div>
          </div>

          {/* Enhanced QR Code Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#45B09E] to-teal-600 rounded-full mb-4">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Quick Access</h2>
              <p className="text-lg text-gray-600">Scan the QR code to visit Jeread instantly</p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              {/* QR Code */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#45B09E] to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-lg">
                  <Image
                    src="/assest/qr.png"
                    alt="Jeread QR Code"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-[#45B09E] text-white p-2 rounded-full shadow-lg">
                    <Smartphone className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="flex-1 max-w-md">
                <div className="space-y-4">
                  <div className="flex items-start bg-white bg-opacity-70 rounded-xl p-4 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-[#45B09E] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">1</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Open Camera</h3>
                      <p className="text-gray-600 text-sm">Use your phone&apos;s camera app or QR scanner</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white bg-opacity-70 rounded-xl p-4 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-[#45B09E] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Scan QR Code</h3>
                      <p className="text-gray-600 text-sm">Point your camera at the QR code</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white bg-opacity-70 rounded-xl p-4 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-[#45B09E] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Jeread</h3>
                      <p className="text-gray-600 text-sm">Tap the link to access our platform</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center text-[#45B09E] font-medium">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share with friends
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center bg-white bg-opacity-80 rounded-full px-6 py-3 backdrop-blur-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-700 font-medium">Available on all devices</span>
              </div>
            </div>
          </div>

          {/* Founder Section */}
          <div className="bg-gradient-to-r from-[#45B09E] to-teal-600 rounded-xl shadow-lg text-white p-8 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Connect with the Founder</h2>
            <p className="text-teal-100 mb-6 text-lg">
              Follow Rakib Hasan Shawon on social media for updates and insights
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://www.facebook.com/shawonetc" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 px-6 py-3 rounded-lg backdrop-blur-sm"
              >
                <Facebook className="w-5 h-5 mr-2" />
                <span className="font-medium">Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/shawonetc" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 px-6 py-3 rounded-lg backdrop-blur-sm"
              >
                <Instagram className="w-5 h-5 mr-2" />
                <span className="font-medium">Instagram</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/shawonetc" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 px-6 py-3 rounded-lg backdrop-blur-sm"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;