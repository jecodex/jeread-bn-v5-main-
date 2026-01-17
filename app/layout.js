import { AuthProvider } from "@/components/ContexProvider/ContextProvider";
import localFont from "next/font/local";
import JeHeader from "./../components/header/JeHeader";
import "./globals.css";
import { Suspense } from "react";
import LoadingHome from "@/components/loading/LoadingHome";
import Script from "next/script";

// Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata
export const metadata = {
  title: {
    default: "Jeread",
    template: "%s",
  },
  description: "Jeread is a social reading platform to read, write, and share real-life stories, insights, and experiences.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://jeread.com"),
  openGraph: {
    title: "Jeread",
    description: "Explore stories, share life lessons, and connect with readers on Jeread.",
    url: "https://jeread.com",
    siteName: "Jeread",
    images: [
      {
        url: "/jeread-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jeread - Dive Into the World of Stories and Ideas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeread",
    description: "Jeread is a vibrant space for sharing stories and insights.",
    images: ["/jeread-og-image.jpg"],
    creator: "@jeread_app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        
        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9KQMQ3SNWR"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9KQMQ3SNWR');
            `,
          }}
        />

        {/* Google Ads Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-748685826"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-748685826');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={<LoadingHome />}>
          <AuthProvider>
            <JeHeader />
            {children}
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
