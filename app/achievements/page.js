// app/dashboard/page.js (Server Component)
import DashboardClient from './dashboard-client';

// Server-side metadata export
// app/achievements/page.js (Server Component)
export const metadata = {
  title: 'Achievements - Performance Milestones',
  description: 'Track your performance achievements, milestones, and progress metrics',
  keywords: 'achievements, milestones, performance, progress, analytics, goals, tracking',
  robots: 'index, follow',
  openGraph: {
    title: 'Achievements - Performance Milestones',
    description: 'Track your performance achievements, milestones, and progress metrics',
    type: 'website',
    images: [
      {
        url: '/images/achievements-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Achievements Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Achievements - Performance Milestones',
    description: 'Track your performance achievements, milestones, and progress metrics',
    images: ['/images/achievements-twitter.jpg'],
  },
  alternates: {
    canonical: '/achievements',
  },
};

// Server-side data fetching (example)
async function getDashboardData() {
  // This would be your actual data fetching logic
  // For now, returning the sample data
  const data = [
    { date: 'Mar 9', clicks: 0.8 },
    { date: 'Mar 10', clicks: 0.5 },
    { date: 'Mar 11', clicks: 0 },
    { date: 'Mar 12', clicks: 0 },
    { date: 'Mar 13', clicks: 0 },
    { date: 'Mar 14', clicks: 2.2 },
    { date: 'Mar 15', clicks: 0 },
    { date: 'Mar 16', clicks: 2.1 },
    { date: 'Mar 17', clicks: 0.5 },
    { date: 'Mar 18', clicks: 0 },
    { date: 'Mar 19', clicks: 0.9 },
    { date: 'Mar 20', clicks: 0 },
    { date: 'Mar 21', clicks: 0 },
    { date: 'Mar 22', clicks: 0.9 },
    { date: 'Mar 23', clicks: 3 },
    { date: 'Mar 24', clicks: 1.5 },
    { date: 'Mar 25', clicks: 1 },
    { date: 'Mar 26', clicks: 0 },
    { date: 'Mar 27', clicks: 0.9 },
    { date: 'Mar 28', clicks: 0 },
    { date: 'Mar 29', clicks: 0.9 },
    { date: 'Mar 30', clicks: 0 },
  ];

  return {
    data,
    totalClicks: data.reduce((sum, item) => sum + item.clicks, 0),
    domain: 'jeread.com'
  };
}

// Server Component
export default async function DashboardPage() {
  // Server-side data fetching
  const dashboardData = await getDashboardData();
  
  return (
    <div>
      {/* Pass server data to client component */}
      <DashboardClient 
        initialData={dashboardData.data}
        totalClicks={dashboardData.totalClicks}
        domain={dashboardData.domain}
      />
    </div>
  );
}