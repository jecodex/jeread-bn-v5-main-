// app/settings/page.js (Enhanced Server Component)
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import SettingsClient from './SettingsClient';

export const metadata = {
  title: 'Settings ',
  description: 'Customize your account and application settings',
  keywords: ['settings', 'account', 'preferences', 'configuration', 'theme', 'privacy'],
  authors: [{ name: 'Your App Team' }],
  creator: 'Your App Name',
  publisher: 'Your Company',
  openGraph: {
    title: 'Settings',
    description: 'Customize your account and application settings',
    type: 'website',
    siteName: 'Your App Name',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Settings',
    description: 'Customize your account and application settings',
    creator: '@yourapptwo',
  },
  robots: {
    index: false, // Settings pages are usually not indexed
    follow: false,
  },
  alternates: {
    canonical: '/settings'
  }
};

// This function runs on the server and can fetch data
async function getInitialSettings() {
  // Example: Fetch user preferences from database or API
  // const userSettings = await fetch('your-api/user-settings');
  
  // For now, return default settings
  return {
    theme: 'light',
    language: 'en',
    notifications: true,
    // Add more initial settings as needed
  };
}

// You can also get theme from cookies for better UX
function getThemeFromCookies() {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  return theme?.value || 'light';
}

export default async function SettingsPage() {
  // Server-side data fetching
  const initialSettings = await getInitialSettings();
  const serverTheme = getThemeFromCookies();
  
  // You can also check authentication here
  // const session = await getServerSession();
  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <div>
      {/* Optional: Add JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Settings",
            "description": "User settings and preferences page",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Your App Name"
            }
          })
        }}
      />
      
      <SettingsClient 
        initialSettings={initialSettings}
        serverTheme={serverTheme}
      />
    </div>
  );
}

// Optional: Generate static params if you have dynamic routes
// export async function generateStaticParams() {
//   return [];
// }

// Optional: Configure page revalidation
// export const revalidate = 3600; // Revalidate every hour