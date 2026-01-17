// app/dashboard/dashboard-client.js (Client Component)
"use client";
import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { PenTool, Calendar, Brain, Trophy } from 'lucide-react';

export default function WritingDashboard() {
  const [domain] = useState('mywritingapp.com');
  
  // Sample data for the chart
  const data = [
    { date: 'Jan 1', clicks: 5 },
    { date: 'Jan 8', clicks: 12 },
    { date: 'Jan 15', clicks: 8 },
    { date: 'Jan 22', clicks: 15 },
    { date: 'Jan 29', clicks: 25 },
    { date: 'Feb 5', clicks: 18 },
    { date: 'Feb 12', clicks: 30 }
  ];
  
  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  
  // Sample achievements data
  const achievements = [
    {
      id: 1,
      title: "First Write! — তোমার প্রথম নোট",
      description: "Your first thought published",
      badge: "Writer unlocked",
      icon: PenTool,
      status: "achieved",
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600"
    },
    {
      id: 2,
      title: "Consistent Writer — ধারাবাহিক লেখক",
      description: "7 days writing streak",
      badge: "Streak Thinker 🔥",
      icon: Calendar,
      status: "achieved",
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600"
    },
    {
      id: 3,
      title: "Deep Thinker — গভীর চিন্তক",
      description: "200+ words in a single post",
      badge: "You think deep 🧠",
      icon: Brain,
      status: "achieved",
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600"
    },
  ];

  const topPerformingDay = data.reduce((max, item) => 
    item.clicks > max.clicks ? item : max, data[0]);

  const handleDomainChange = () => {
    console.log('Domain change clicked');
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl">
        {/* Header with domain selector */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              W
            </div>
            <button 
              onClick={handleDomainChange}
              className="flex items-center text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              {domain} 
              <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Achievements section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-blue-600">
              <Trophy className="w-5 h-5 mr-1" />
              <span className="font-semibold text-lg">Achievements</span>
              <svg className="h-5 w-5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
            </div>
          </div>
          
          {/* Achievement items - Grid removed, now displayed as single column */}
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className={`${achievement.bgColor} rounded-full p-2 flex-shrink-0`}>
                    <achievement.icon className={`w-5 h-5 ${achievement.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-sm leading-tight">
                      {achievement.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {achievement.description}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600">
                        {achievement.badge}
                      </span>
                      <div className="flex items-center">
                        {achievement.status === 'achieved' && (
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            ✓ Achieved
                          </div>
                        )}
                        {achievement.status === 'in-progress' && (
                          <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            {achievement.progress}
                          </div>
                        )}
                        {achievement.status === 'locked' && (
                          <div className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            🔒 Locked
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Achievement summary */}
          <div className="mt-6 bg-white rounded-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-sm text-gray-500">3/3</span>
              </div>
              <div className="text-sm text-gray-500">
                Keep writing to unlock more achievements! 📝
              </div>
            </div>
          </div>
        </div>

        {/* Performance section */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">Writing Performance</h1>
          <p className="text-center text-gray-600 mt-1">Last 28 days</p>
        </div>

        {/* Analytics card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <div className="text-gray-500 text-sm">Total Posts Written</div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">{Math.round(totalClicks)}</span>
                <span className="text-gray-500 ml-1">📝</span>
              </div>
              <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-green-500 flex items-center text-sm">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                200% increase from last month
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#2563EB" 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}