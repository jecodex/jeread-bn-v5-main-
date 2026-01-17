import JeReadLandingPage from "@/components/Featured/Landing";

export const metadata = {
  title: 'JeRead - কোটস এবং ছোট বই পড়ো | বাংলা ডিজিটাল প্ল্যাটফর্ম',
  description: 'JeRead এ কোটস এবং ছোট বই পড়ো। অনুপ্রেরণামূলক কোটস এবং জ্ঞানগর্ভ ছোট বইয়ের মাধ্যমে নিজেকে সমৃদ্ধ করো।',
  keywords: 'JeRead, বাংলা কোটস, ছোট বই, অনুপ্রেরণা, quotes, bangla books, motivational quotes, বাংলা প্ল্যাটফর্ম, শিক্ষা',
  authors: [{ name: 'JeRead Team' }],
  creator: 'JeRead',
  publisher: 'JeRead',
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
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: 'https://jeread.com',
    siteName: 'JeRead',
    title: 'JeRead - কোটস এবং ছোট বই পড়ো',
    description: 'JeRead এ কোটস এবং ছোট বই পড়ো। অনুপ্রেরণামূলক কোটস এবং জ্ঞানগর্ভ ছোট বইয়ের মাধ্যমে নিজেকে সমৃদ্ধ করো।',
    images: [
      {
        url: '/images/jeread-og-image.png',
        width: 1200,
        height: 630,
        alt: 'JeRead - কোটস এবং ছোট বই প্ল্যাটফর্ম',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jeread',
    creator: '@jeread',
    title: 'JeRead - কোটস এবং ছোট বই পড়ো',
    description: 'JeRead এ কোটস এবং ছোট বই পড়ো। অনুপ্রেরণামূলক কোটস এবং জ্ঞানগর্ভ ছোট বইয়ের মাধ্যমে নিজেকে সমৃদ্ধ করো।',
    images: ['/images/jeread-twitter-image.png'],
  },
  alternates: {
    canonical: 'https://jeread.com',
    languages: {
      'bn-BD': 'https://jeread.com',
      'en-US': 'https://jeread.com/en',
    },
  },
  category: 'books',
  classification: 'Digital Books and Quotes Platform',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function AdsPage() {
  return (
    <div>
      <JeReadLandingPage />
    </div>
  );
}