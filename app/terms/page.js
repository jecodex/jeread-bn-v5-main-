// app/terms/page.js (App Router) or pages/terms.js (Pages Router with getStaticProps)
import { AlertCircle, ChevronRight, Copyright, Eye, FileText, Shield, UserPlus, Scale, BookOpen, Mail } from 'lucide-react';
import ClientTermsWrapper from './ClientTermsWrapper';

// Metadata export for App Router
export const metadata = {
  title: 'Terms & Conditions | Jeread.com',
  description: 'Legal terms and conditions for using Jeread.com - a platform for sharing quotes and personal notes.',
  keywords: 'terms, conditions, legal, copyright, DMCA, Jeread',
  openGraph: {
    title: 'Terms & Conditions | Jeread.com',
    description: 'Legal terms and conditions for using Jeread.com - a platform for sharing quotes and personal notes.',
    type: 'website',
  },
};

const Terms = () => {
  const navigationItems = [
    { id: 'introduction', label: 'Introduction', icon: 'Eye' },
    { id: 'user-content', label: 'User Generated Content', icon: 'UserPlus' },
    { id: 'copyright', label: 'Copyright Policy', icon: 'Copyright' },
    { id: 'dmca', label: 'DMCA Compliance', icon: 'Shield' },
    { id: 'content-removal', label: 'Content Removal', icon: 'FileText' },
    { id: 'limitation-of-liability', label: 'Limitation of Liability', icon: 'Shield' },
    { id: 'indemnification', label: 'Indemnification', icon: 'AlertCircle' }
  ];

  const userResponsibilities = [
    "You are solely responsible for any content you upload to our platform",
    "You affirm that you own all rights to the content you upload or have the necessary permissions to share it",
    "You understand that all content you share may be viewed by other users",
    "You agree not to upload any content that infringes upon the intellectual property rights of others",
    "You will not upload illegal, harmful, offensive, or inappropriate content"
  ];

  const copyrightNotices = [
    "We operate as a platform service provider and do not claim ownership of user-generated content",
    "We store and display content at the direction of our users",
    "We rely on our users to ensure they have the right to share the content they upload",
    "We will promptly respond to proper copyright infringement notices"
  ];

  const dmcaRequirements = [
    "A physical or electronic signature of the copyright owner or authorized representative",
    "Identification of the copyrighted work claimed to be infringed",
    "Identification of the material claimed to be infringing with sufficient information for us to locate it",
    "Your contact information (name, address, telephone number, email)",
    "A statement that you have a good faith belief that the use is not authorized by the copyright owner",
    "A statement under penalty of perjury that the information in your notice is accurate and that you are the copyright owner or authorized to act on behalf of the owner"
  ];

  const contentRemovalSteps = [
    "Promptly remove or disable access to the allegedly infringing content",
    "Notify the content provider of the removal",
    "Provide the content provider with a copy of the copyright infringement notification",
    "Provide information about submitting a counter-notification"
  ];

  const liabilityLimitations = [
    "We are not liable for any content uploaded by users",
    "We make no warranties regarding the accuracy, legality, or non-infringement of user-generated content",
    "We shall not be liable for any claims, damages, or liabilities arising from user-generated content",
    "We shall not be liable for any claims related to copyright infringement of user-uploaded content"
  ];

  const indemnificationItems = [
    "Your violation of these Terms and Conditions",
    "Your user-generated content, including any claims of copyright infringement",
    "Your use of the platform",
    "Any breach of representations and warranties made by you"
  ];

  const complianceMeasures = [
    "We have adopted and implemented a policy to terminate accounts of repeat infringers",
    "We have designated an agent to receive copyright infringement notifications",
    "We respond expeditiously to valid copyright infringement notices",
    "We maintain a notice-and-takedown system in compliance with applicable laws",
    "We do not interfere with standard technical measures used by copyright owners"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-2 mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Pass navigation and content data to client wrapper */}
          <ClientTermsWrapper 
            navigationItems={navigationItems}
            content={{
              userResponsibilities,
              copyrightNotices,
              dmcaRequirements,
              contentRemovalSteps,
              liabilityLimitations,
              indemnificationItems,
              complianceMeasures
            }}
          />
          
          {/* Static Content */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                
                <section id="introduction">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Introduction</h2>
                  </div>
                  <div className="p-6 rounded-xl">
                    <p className="text-slate-700 leading-relaxed text-lg">
                      Welcome to <span className="font-bold text-teal-700">Jeread.com</span>, a platform that allows users to share pictures, quotes, and notes with other users. By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform.
                    </p>
                  </div>
                </section>
                
                <section id="user-content">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <UserPlus className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">User Generated Content</h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    Our platform allows users to upload and share content, including but not limited to text, images, quotes, and personal notes. By uploading content to our platform, you acknowledge and agree to the following:
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-blue-900 text-lg mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      User Responsibilities:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {userResponsibilities.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                
                <section id="copyright">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <Copyright className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Copyright Policy</h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    <span className="font-bold text-teal-700">Jeread.com</span> respects the intellectual property rights of others and expects our users to do the same. We operate under the &quot;safe harbor&quot; provisions of applicable copyright laws, including the Digital Millennium Copyright Act (DMCA) in the United States and similar laws globally.
                  </p>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-amber-900 text-lg mb-3 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Important Copyright Notice:
                    </h3>
                    <p className="text-amber-800 leading-relaxed">
                      Our platform acts as an intermediary service provider that allows users to upload and share content. We do not actively monitor or screen content before it is posted. We are not responsible for and do not endorse any user-generated content, nor do we guarantee its accuracy, integrity, quality, or intellectual property compliance.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-6">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      By using our platform, you understand that:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {copyrightNotices.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                
                <section id="dmca">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">DMCA Compliance</h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    If you believe that your copyrighted work has been uploaded to our platform without authorization, you may submit a copyright infringement notification. These notifications must include:
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                    <div className="grid gap-4">
                      {dmcaRequirements.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-green-600 text-sm font-bold">{index + 1}</span>
                          </div>
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 text-green-800 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      DMCA Notifications:
                    </h3>
                    <p className="text-green-700">
                      Send all DMCA notifications to: <span className="font-bold text-teal-900">copyright@jeread.com</span>
                    </p>
                  </div>
                </section>
                
                <section id="content-removal">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Content Removal</h2>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Upon receiving a valid copyright infringement notification, we will:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {contentRemovalSteps.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg">
                    We reserve the right to remove any content that appears to violate copyright law, even without a formal notification. We also reserve the right to terminate user accounts of repeat infringers.
                  </p>
                </section>
                
                <section id="limitation-of-liability">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Limitation of Liability</h2>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    <span className="font-bold text-teal-700">Jeread.com</span> acts solely as an intermediary platform that enables users to share content. To the fullest extent permitted by law:
                  </p>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
                    <div className="grid gap-3">
                      {liabilityLimitations.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                    <h3 className="font-bold text-red-900 text-lg mb-2">Disclaimer:</h3>
                    <p className="text-red-800 leading-relaxed">
                      Our platform is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind. We expressly disclaim all liability for user-generated content and any claims of copyright infringement arising from such content.
                    </p>
                  </div>
                </section>
                
                <section id="indemnification">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Indemnification</h2>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    By using our platform, you agree to indemnify, defend, and hold harmless <span className="font-bold text-teal-700">Jeread.com</span>, its owners, operators, affiliates, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to:
                  </p>
                  
                  <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 mb-6">
                    <div className="grid gap-3">
                      {indemnificationItems.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg">
                    This indemnification obligation will survive the termination of your account and your use of our platform.
                  </p>
                </section>
                
                {/* Legal Compliance Statement */}
                <section className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-2xl p-8 border border-slate-200">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Legal Compliance Statement</h3>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    <span className="font-bold text-teal-700">Jeread.com</span> operates as an online service provider under applicable copyright laws and provides a platform for users to share content. We respect intellectual property rights and implement the following measures:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {complianceMeasures.map((item, index) => (
                      <div key={index} className="flex items-start bg-white p-4 rounded-lg">
                        <ChevronRight className="h-4 w-4 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed bg-white/60 p-4 rounded-lg">
                    These policies and practices are designed to qualify for safe harbor protection under applicable copyright laws.
                  </p>
                </section>
                
                {/* Contact Section */}
                <section className="bg-gradient-to-r from-teal-100 to-blue-100 text-teal-800 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <Mail className="h-8 w-8 mr-4 text-teal-700" />
                    <h2 className="text-2xl font-bold text-teal-900">Contact Us</h2>
                  </div>
                  <p className="text-teal-700 text-lg mb-6">
                    For questions about these Terms and Conditions or copyright matters, please contact us at:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-teal-900">General Legal Inquiries</h4>
                      <p className="text-teal-700">legal@jeread.com</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-teal-900">DMCA Agent</h4>
                      <p className="text-teal-700">copyright@jeread.com</p>
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
};

export default Terms;
