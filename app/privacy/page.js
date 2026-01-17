// app/privacy/page.js (Server Component)
import { Metadata } from 'next';
import PrivacyClient from './privacy-client';

export const metadata = {
  title: 'Privacy Policy | Jeread.com',
  description: 'Learn how Jeread.com collects, uses, and protects your personal information. Our comprehensive privacy policy explains your rights and our data practices.',
  keywords: 'privacy policy, data protection, personal information, cookies, GDPR, user rights',
  openGraph: {
    title: 'Privacy Policy | Jeread.com',
    description: 'Your privacy is important to us. Learn how we collect, use, and protect your information.',
    type: 'website',
    url: 'https://jeread.com/privacy',
    siteName: 'Jeread.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Jeread.com',
    description: 'Your privacy is important to us. Learn how we collect, use, and protect your information.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://jeread.com/privacy',
  }
};

// Server Component - handles SEO and initial data
export default function PrivacyPage() {
  // You can fetch server-side data here if needed
  const lastUpdated = "April 2, 2025";
  const companyName = "Jeread.com";
  
  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "Privacy policy for Jeread.com explaining data collection, usage, and user rights",
            "url": "https://jeread.com/privacy",
            "dateModified": lastUpdated,
            "publisher": {
              "@type": "Organization",
              "name": companyName,
              "url": "https://jeread.com"
            }
          })
        }}
      />
      
      {/* Client Component handles all interactivity */}
      <PrivacyClient 
        lastUpdated={lastUpdated}
        companyName={companyName}
      />
    </>
  );
}