"use client"
import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  Bell, 
  QrCode, 
  FileText, 
  Upload, 
  TrendingUp, 
  Mail,
  Search,
  Filter,
  Download,
  Plus,
  ChevronRight,
  Menu,
  CreditCard,
  Smartphone,
  User,
  Camera,
  ScanLine,
  BookOpen,
  Check,
  X,
  Edit3,
  ArrowLeft,
  RotateCcw,
  Eye,
  Save,
  Clock,
  ChartNoAxesColumn,
  ScrollText,
  UserRound
} from 'lucide-react';

export default function ChalikhataApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [scanStep, setScanStep] = useState('camera'); // camera, preview, edit, confirm
  const [scannedData, setScannedData] = useState(null);
  const [scannedImage, setScannedImage] = useState(null);
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'রানা ভাই', amount: 3400.00, type: 'received', time: '১ ঘন্টা', avatar: 'রা', description: 'পণ্য বিক্রয়' },
    { id: 2, name: 'হাসান ভাই', amount: 8040.00, type: 'sent', time: '২ ঘন্টা', avatar: 'হা', description: 'মাল ক্রয়' },
    { id: 3, name: 'Fahim Rana', amount: 500.00, type: 'pending', time: '১ দিন', avatar: 'F', description: 'বকেয়া আদায়' },
    { id: 4, name: 'নাজমুল চাচা', amount: 2450.00, type: 'received', time: '২ দিন', avatar: 'না', description: 'পুরাতন দেনা' },
    { id: 5, name: 'করিম স্টোর', amount: 1200.00, type: 'purchase', time: '৩ দিন', avatar: 'ক', description: 'দোকানি মাল' },
    { id: 6, name: 'সালাম ভাই', amount: 750.00, type: 'sale', time: '৪ দিন', avatar: 'সা', description: 'খুচরা বিক্রয়' }
  ]);

  const menuItems = [
    { icon: ChartNoAxesColumn , label: 'ব্যবসা', color: '#4B9ED3' },
    { icon: ScrollText, label: 'ব্যাসার নোট', color: 'text-orange-500' },
    { icon: UserRound , label: 'কাস্টমার', color: '#4B9ED3' },
    { icon: BookOpen, label: 'খাতা স্ক্যান', color: 'text-red-500', action: () => setShowScanner(true) },
    { icon: FileText, label: 'পেমেন্ট রিপোর্ট', color: 'text-blue-500' },
    { icon: Upload, label: 'ডাটা ব্যাকআপ', color: 'text-teal-500' },
    { icon: TrendingUp, label: 'সেলিং রেপর্ট', color: 'text-pink-500' },
    { icon: Mail, label: 'কাস্টমার', color: 'text-indigo-500' }
  ];

  const getTransactionColor = (type) => {
    switch(type) {
      case 'received': return 'text-green-600';
      case 'sent': return 'text-red-600';
      case 'pending': return 'text-orange-600';
      case 'sale': return 'text-blue-600';
      case 'purchase': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'received': return '+';
      case 'sent': return '-';
      case 'pending': return '⏳';
      case 'sale': return '💰';
      case 'purchase': return '🛒';
      default: return '';
    }
  };

  const getAvatarColor = (index) => {
    const colors = ['bg-pink-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];
    return colors[index % colors.length];
  };

  // Scanner Functions
  const handleScanCapture = () => {
    // Simulate camera capture
    setScannedImage('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//sample');
    setScanStep('preview');
    
    // Simulate OCR processing after a delay
    setTimeout(() => {
      setScannedData([
        { name: 'রহিম ভাই', amount: 2500, type: 'received', date: '২৮ ডিসেম্বর', description: 'চাল বিক্রয়' },
        { name: 'সালেহা আপা', amount: 800, type: 'sent', date: '২৮ ডিসেম্বর', description: 'দুধ কিনেছি' },
        { name: 'করিম চাচা', amount: 1200, type: 'pending', date: '২৭ ডিসেম্বর', description: 'বাকি আছে' }
      ]);
      setScanStep('edit');
    }, 2000);
  };

  const handleScanConfirm = () => {
    // Add scanned transactions to main list
    const newTransactions = scannedData.map((item, index) => ({
      id: transactions.length + index + 1,
      name: item.name,
      amount: item.amount,
      type: item.type,
      time: item.date,
      avatar: item.name.charAt(0),
      description: item.description
    }));
    
    setTransactions([...newTransactions, ...transactions]);
    setShowScanner(false);
    setScanStep('camera');
    setScannedData(null);
    setScannedImage(null);
  };

  const handleScanCancel = () => {
    setShowScanner(false);
    setScanStep('camera');
    setScannedData(null);
    setScannedImage(null);
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen relative mt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Store Info */}
          <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 border-2 border-gray-100 bg-slate-200 rounded-full flex items-center justify-center ">
                <span className="text-xl font-bold text-slate-700">R</span>
              </div>
              <div>
                <h1 className="text-md font-semibold text-gray-800">রাকিব স্টোর ব্যবসায়িক </h1>
              <div className='flex items-center space-x-2 bg-red-50 px-3 text-md rounded-lg border border-red-100'>
              <TrendingUp className="w-4 h-4 text-red-600" />
              <p className="text-[13px] font-semibold text-gray-800"> ৪২,৬৫২৳</p>
              </div>
              </div>
              
            </div>
          </div>
            
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Menu Grid - Made larger */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className="text-center cursor-pointer"
              onClick={item.action || (() => {})}
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-3 mx-auto hover:bg-gray-100 transition-colors shadow-sm">
                <item.icon 
                  className={`w-7 h-7 ${typeof item.color === 'string' && item.color.startsWith('#') ? '' : item.color}`}
                  style={typeof item.color === 'string' && item.color.startsWith('#') ? {color: item.color} : {}}
                />
              </div>
              <p className="text-sm text-gray-700 font-medium leading-tight">{item.label}</p>
            </div>
          ))}
        </div>

         {/* Category Pills */}
      <div className="px-2 mb-4">
        <div className="flex space-x-3">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
            সব লেনদেন
          </div>
          <div className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
            আজকের
          </div>
          <div className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
            বাকি
          </div>
        </div>
      </div>

        {/* Transaction Date */}

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarColor(index)}`}>
                  {transaction.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.name}</p>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                  <p className="text-xs text-blue-500">{transaction.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className={`font-bold ${getTransactionColor(transaction.type)}`}>
                  {getTransactionIcon(transaction.type)}৳{transaction.amount.toFixed(2)}
                </p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-sm mx-4 rounded-xl overflow-hidden">
            
            {/* Scanner Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <button onClick={handleScanCancel}>
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-lg font-bold text-gray-800">খাতা স্ক্যান</h2>
                <div className="w-5"></div>
              </div>
            </div>

            {/* Camera View */}
            {scanStep === 'camera' && (
              <div className="relative">
                <div className="bg-gray-900 h-80 flex items-center justify-center relative">
                  <div className="w-64 h-48 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-70" />
                      <p className="text-sm">খাতার পৃষ্ঠা ফ্রেমের মধ্যে রাখুন</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="bg-black bg-opacity-50 rounded-lg px-3 py-1">
                      <span className="text-white text-xs">OCR সক্রিয়</span>
                    </div>
                    <div className="bg-black bg-opacity-50 rounded-lg p-1">
                      <ScanLine className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-600 mb-4">খাতার লেখা স্পষ্ট দেখা যাচ্ছে কিনা নিশ্চিত করুন</p>
                  <button 
                    onClick={handleScanCapture}
                    className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-blue-500" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Preview Step */}
            {scanStep === 'preview' && (
              <div className="p-4 text-center">
                <div className="bg-gray-100 rounded-lg p-6 mb-4">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p className="text-sm text-gray-600">খাতার লেখা পড়া হচ্ছে...</p>
                  <p className="text-xs text-gray-500 mt-1">OCR প্রক্রিয়াকরণ</p>
                </div>
              </div>
            )}

            {/* Edit/Confirm Step */}
            {scanStep === 'edit' && scannedData && (
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 bg-green-50 border-b border-green-200">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-700 font-medium">
                      {scannedData.length}টি লেনদেন পাওয়া গেছে
                    </p>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  {scannedData.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="font-medium text-gray-800">{item.name}</span>
                        </div>
                        <button className="text-blue-500 p-1">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">পরিমাণ:</span>
                          <span className={`ml-1 font-medium ${getTransactionColor(item.type)}`}>
                            {getTransactionIcon(item.type)}৳{item.amount}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">তারিখ:</span>
                          <span className="ml-1 text-gray-700">{item.date}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">বিবরণ:</span>
                          <span className="ml-1 text-gray-700">{item.description}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setScanStep('camera')}
                      className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center justify-center space-x-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>আবার স্ক্যান</span>
                    </button>
                    <button 
                      onClick={handleScanConfirm}
                      className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>সংরক্ষণ</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
        <div className="flex justify-around items-center py-3 relative">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? '' : 'text-gray-400'}`}
            style={activeTab === 'home' ? {color: '#4B9ED3'} : {}}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">হোম</span>
          </button>
          <button 
            onClick={() => setActiveTab('accounts')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'accounts' ? '' : 'text-gray-400'}`}
            style={activeTab === 'accounts' ? {color: '#4B9ED3'} : {}}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">অ্যাকাউন্ট</span>
          </button>
          
          {/* Central Scan Button */}
          <button 
            onClick={() => setShowScanner(true)}
            className="flex flex-col items-center relative -mt-6"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <ScanLine  className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-blue-600 mt-1">খাতা স্ক্যান</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('wallet')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'wallet' ? '' : 'text-gray-400'}`}
            style={activeTab === 'wallet' ? {color: '#4B9ED3'} : {}}
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-xs">ওয়ালেট</span>
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'menu' ? '' : 'text-gray-400'}`}
            style={activeTab === 'menu' ? {color: '#4B9ED3'} : {}}
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">মেনু</span>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-20 right-4 w-14 h-14 text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        style={{backgroundColor: '#4B9ED3'}}
        title="নতুন লেনদেন যোগ করুন"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}