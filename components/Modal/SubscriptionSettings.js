"use client";
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Star, 
  Crown, 
  Zap, 
  Gift, 
  RefreshCw,
  Download,
  FileText,
  Clock,
  Shield,
  Users,
  Infinity,
  X
} from 'lucide-react';

// Main Subscription Settings Component
function SubscriptionSettings({ darkMode }) {
  const [currentPlan, setCurrentPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">সাবস্ক্রিপশন সেটিংস</h2>
            <p className="text-gray-600 dark:text-gray-300">আপনার সাবস্ক্রিপশন প্ল্যান এবং বিলিং তথ্য ম্যানেজ করুন</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              সক্রিয়
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Current Plan Status */}
        <CurrentPlanCard currentPlan={currentPlan} />

      
      </div>
    </div>
  );
}

// Current Plan Card
function CurrentPlanCard({ currentPlan }) {
  const planDetails = {
    free: { name: 'ফ্রি', icon: <Gift className="w-6 h-6" />, color: 'gray' },
    basic: { name: 'বেসিক', icon: <Star className="w-6 h-6" />, color: 'blue' },
    premium: { name: 'প্রিমিয়াম', icon: <Crown className="w-6 h-6" />, color: 'purple' },
    pro: { name: 'প্রো', icon: <Zap className="w-6 h-6" />, color: 'teal' }
  };

  const current = planDetails[currentPlan];

  return (
    <div className="bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            {current.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{current.name} প্ল্যান</h3>
            <p className="text-white/80">বর্তমানে সক্রিয় প্ল্যান</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">৳৯৯৯</div>
          <div className="text-white/80 text-sm">প্রতি মাসে</div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">পরবর্তী বিলিং</span>
          </div>
          <div className="font-semibold">১৫ জুন, ২০২৫</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">ব্যবহারকারী</span>
          </div>
          <div className="font-semibold">আনলিমিটেড</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">সাপোর্ট</span>
          </div>
          <div className="font-semibold">২৪/৭ প্রিমিয়াম</div>
        </div>
      </div>
    </div>
  );
}


export default SubscriptionSettings;