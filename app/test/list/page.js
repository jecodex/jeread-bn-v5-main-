"use client"
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  ShoppingBag,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  MoreVertical,
  User,
  Users,
  CreditCard,
  AlertCircle
} from 'lucide-react';

export default function CustomerListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // all, credit, debit, regular

  const customers = [
    {
      id: 1,
      name: 'করিম স্টোর',
      phone: '০১৭৯৮৭৬৫৪৩২',
      address: 'পান্থপথ',
      avatar: 'ক',
      totalPurchase: 12800,
      totalPaid: 11600,
      due: 1200,
      lastTransaction: '৪ দিন আগে',
      status: 'wholesale',
      transactions: [
        { date: '২৫ জুন', item: 'চাল ৫০ কেজি', amount: 5000, type: 'purchase' },
        { date: '২৩ জুন', item: 'পেমেন্ট', amount: 8000, type: 'payment' },
        { date: '২২ জুন', item: 'ডাল ১০ কেজি', amount: 1500, type: 'purchase' }
      ]
    },
    {
      id: 2,
      name: 'নাজমুল চাচা',
      phone: '০১৯৮৭৬৫৪৩২১',
      address: 'গুলশান ২',
      avatar: 'না',
      totalPurchase: 25600,
      totalPaid: 23150,
      due: 2450,
      lastTransaction: '২ দিন আগে',
      status: 'vip',
      transactions: [
        { date: '২৭ জুন', item: 'চাল ২০ কেজি', amount: 2000, type: 'purchase' },
        { date: '২৫ জুন', item: 'পেমেন্ট', amount: 5000, type: 'payment' },
        { date: '২৪ জুন', item: 'তেল ৫ লিটার', amount: 900, type: 'purchase' },
        { date: '২৩ জুন', item: 'ডাল ৫ কেজি', amount: 750, type: 'purchase' }
      ]
    },
    {
      id: 3,
      name: 'ফাহিম রানা',
      phone: '০১৫১১১২২৩৩৪',
      address: 'ধানমন্ডি ২৭',
      avatar: 'ফা',
      totalPurchase: 4500,
      totalPaid: 4000,
      due: 500,
      lastTransaction: '১ দিন আগে',
      status: 'regular',
      transactions: [
        { date: '২৮ জুন', item: 'দুধ ২ লিটার', amount: 120, type: 'purchase' },
        { date: '২৬ জুন', item: 'ডিম ১ ডজন', amount: 180, type: 'purchase' },
        { date: '২৪ জুন', item: 'পেমেন্ট', amount: 1500, type: 'payment' }
      ]
    },
    {
      id: 4,
      name: 'রানা ভাই',
      phone: '০১৭১২৩৪৫৬৭৮',
      address: 'মিরপুর ১০, ঢাকা',
      avatar: 'রা',
      totalPurchase: 15400,
      totalPaid: 12000,
      due: 3400,
      lastTransaction: '১ ঘন্টা আগে',
      status: 'regular',
      transactions: [
        { date: '২৯ জুন', item: 'চাল ৫ কেজি', amount: 500, type: 'purchase' },
        { date: '২৮ জুন', item: 'ডাল ২ কেজি', amount: 300, type: 'purchase' },
        { date: '২৭ জুন', item: 'তেল ১ লিটার', amount: 180, type: 'purchase' },
        { date: '২৬ জুন', item: 'পেমেন্ট', amount: 2000, type: 'payment' }
      ]
    },
    {
      id: 5,
      name: 'সালেহা আপা',
      phone: '০১৬১২৩৪৫৬৭৮',
      address: 'বনানী',
      avatar: 'সা',
      totalPurchase: 3200,
      totalPaid: 2400,
      due: 800,
      lastTransaction: '৩ দিন আগে',
      status: 'regular',
      transactions: [
        { date: '২৬ জুন', item: 'সবজি', amount: 250, type: 'purchase' },
        { date: '২৪ জুন', item: 'মাছ ১ কেজি', amount: 400, type: 'purchase' },
        { date: '২২ জুন', item: 'পেমেন্ট', amount: 800, type: 'payment' }
      ]
    },
    {
      id: 6,
      name: 'হাসান ভাই',
      phone: '০১৮৯৮৭৬৫৪৩২',
      address: 'উত্তরা সেক্টর ৭',
      avatar: 'হা',
      totalPurchase: 8500,
      totalPaid: 8500,
      due: 0,
      lastTransaction: '২ ঘন্টা আগে',
      status: 'paid',
      transactions: [
        { date: '২৯ জুন', item: 'আটা ১০ কেজি', amount: 800, type: 'purchase' },
        { date: '২৯ জুন', item: 'পেমেন্ট', amount: 800, type: 'payment' },
        { date: '২৫ জুন', item: 'চিনি ২ কেজি', amount: 150, type: 'purchase' }
      ]
    }
  ];

  // বাংলা অক্ষর অনুযায়ী সাজানোর ফাংশন
  const sortByBanglaAlphabet = (customers) => {
    return [...customers].sort((a, b) => {
      return a.name.localeCompare(b.name, 'bn', { sensitivity: 'base' });
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'wholesale': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'regular': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'vip': return 'ভিআইপি';
      case 'wholesale': return 'পাইকারি';
      case 'paid': return 'পরিশোধিত';
      case 'regular': return 'নিয়মিত';
      default: return 'নিয়মিত';
    }
  };

  const getAvatarColor = (index) => {
    const colors = ['bg-pink-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-blue-200', 'bg-red-200'];
    return colors[index % colors.length];
  };

  const filteredCustomers = sortByBanglaAlphabet(customers).filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'credit') return matchesSearch && customer.due > 0;
    if (activeFilter === 'debit') return matchesSearch && customer.due === 0;
    if (activeFilter === 'regular') return matchesSearch && customer.status === 'regular';
    
    return matchesSearch;
  });

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
    setSelectedCustomer(null);
  };

  const totalDue = customers.reduce((sum, customer) => sum + customer.due, 0);
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.due > 0).length;

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen relative mt-20">
      
      {!showDetails ? (
        <>
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <button className="p-1">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">কাস্টমার তালিকা</h1>
                  <p className="text-xs text-gray-500">মোট {totalCustomers} জন কাস্টমার</p>
                </div>
              </div>
              <button className="p-2 rounded-lg" style={{backgroundColor: '#4B9ED3'}}>
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <p className="text-xs text-red-600 font-medium">মোট বাকি</p>
                <p className="text-sm font-bold text-red-700">৳{totalDue.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-xs text-green-600 font-medium">সক্রিয় কাস্টমার</p>
                <p className="text-sm font-bold text-green-700">{activeCustomers} জন</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xs text-blue-600 font-medium">নতুন এই মাসে</p>
                <p className="text-sm font-bold text-blue-700">৮ জন</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="নাম বা ফোন নম্বর দিয়ে খোঁজ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2"
                style={{'--tw-ring-color': '#4B9ED3'}}
              />
              <Filter className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2 mb-4 overflow-x-auto">
              {[
                { key: 'all', label: 'সব', icon: Users },
                { key: 'credit', label: 'বাকিদার', icon: AlertCircle },
                { key: 'debit', label: 'ক্লিয়ার', icon: CreditCard },
                { key: 'regular', label: 'নিয়মিত', icon: User }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                    activeFilter === filter.key 
                      ? 'text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  style={activeFilter === filter.key ? {backgroundColor: '#4B9ED3'} : {}}
                >
                  <filter.icon className="w-3 h-3" />
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Customer List */}
          <div className="px-4 pb-24">
            <div className="space-y-3">
              {filteredCustomers.map((customer, index) => (
                <div 
                  key={customer.id} 
                  className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarColor(index)}`}>
                        {customer.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-gray-800">{customer.name}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                            {getStatusLabel(customer.status)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          <Phone className="w-3 h-3 inline mr-1" />
                          {customer.phone}
                        </p>
                        <p className="text-xs text-gray-500">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {customer.lastTransaction}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        {customer.due > 0 ? (
                          <div className="text-right">
                            <p className="text-xs text-gray-500">বাকি</p>
                            <p className="text-sm font-bold text-red-600">৳{customer.due.toLocaleString()}</p>
                          </div>
                        ) : (
                          <div className="text-right">
                            <p className="text-xs text-green-600">ক্লিয়ার</p>
                            <p className="text-sm font-bold text-green-600">৳০</p>
                          </div>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500">মোট: ৳{customer.totalPurchase.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Customer Details View */
        <div className="min-h-screen bg-white">
          
          {/* Detail Header */}
          <div className="bg-white shadow-sm border-b border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBackClick} className="p-1">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-bold text-gray-800">কাস্টমার বিবরণ</h1>
              <button className="p-1">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Customer Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ${getAvatarColor(0)}`}>
                  {selectedCustomer?.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{selectedCustomer?.name}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCustomer?.status)}`}>
                      {getStatusLabel(selectedCustomer?.status)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <Phone className="w-4 h-4 inline mr-2" />
                      {selectedCustomer?.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      {selectedCustomer?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">মোট কিনেছেন</span>
                </div>
                <p className="text-2xl font-bold text-green-800">৳{selectedCustomer?.totalPurchase.toLocaleString()}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">পরিশোধ করেছেন</span>
                </div>
                <p className="text-2xl font-bold text-blue-800">৳{selectedCustomer?.totalPaid.toLocaleString()}</p>
              </div>
              
              <div className={`p-4 rounded-xl ${selectedCustomer?.due > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className={`w-5 h-5 ${selectedCustomer?.due > 0 ? 'text-red-600' : 'text-green-600'}`} />
                  <span className={`text-sm font-medium ${selectedCustomer?.due > 0 ? 'text-red-700' : 'text-green-700'}`}>
                    {selectedCustomer?.due > 0 ? 'বাকি আছে' : 'কোন বাকি নেই'}
                  </span>
                </div>
                <p className={`text-2xl font-bold ${selectedCustomer?.due > 0 ? 'text-red-800' : 'text-green-800'}`}>
                  ৳{selectedCustomer?.due.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">মোট লেনদেন</span>
                </div>
                <p className="text-2xl font-bold text-purple-800">{selectedCustomer?.transactions.length}টি</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mb-6">
              <button className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>নতুন বিক্রয়</span>
              </button>
              <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>পেমেন্ট নিন</span>
              </button>
            </div>

            {/* Transaction History */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">লেনদেনের ইতিহাস</h3>
                <button className="text-blue-500 text-sm font-medium">সব দেখুন</button>
              </div>
              
              <div className="space-y-3">
                {selectedCustomer?.transactions.map((transaction, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'payment' ? 'bg-green-200' : 'bg-blue-200'
                        }`}>
                          {transaction.type === 'payment' ? (
                            <DollarSign className="w-4 h-4 text-green-600" />
                          ) : (
                            <ShoppingBag className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{transaction.item}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <p className={`font-bold ${
                        transaction.type === 'payment' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {transaction.type === 'payment' ? '+' : '-'}৳{transaction.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button - Only show on main list */}
      {!showDetails && (
        <button 
          className="fixed bottom-20 right-4 w-14 h-14 text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          style={{backgroundColor: '#4B9ED3'}}
          title="নতুন কাস্টমার যোগ করুন"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}