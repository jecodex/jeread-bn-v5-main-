'use client';
import React, { useState } from 'react';
import { X, Hash, BookOpen, DollarSign, CreditCard } from 'lucide-react';
import Image from 'next/image';

export default function QuoraPlusSubscription() {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [cardNumber, setCardNumber] = useState('');
  const [showBkashModal, setShowBkashModal] = useState(false);
  const [bkashPhone, setBkashPhone] = useState('');
  const [bkashPin, setBkashPin] = useState('');
  const [bkashStep, setBkashStep] = useState(1);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkEmail, setLinkEmail] = useState('');
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl mx-auto w-full p-8 relative">
        {/* Close Button */}
        <button className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
           
            {/* jeread logo */}
            <Image src="https://jeread.com/favicon.ico" alt="jeread" width={80} height={80} className="rounded-full object-cover" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Join jeread Plus</h2>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {/* Benefits */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#ECF7F5] rounded-full flex items-center justify-center mr-3">
                  <Hash className="text-teal-600" size={18} />
                </div>
                <p className="text-sm text-gray-600">Browse jeread ad-free</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#ECF7F5] rounded-full flex items-center justify-center mr-3">
                  <BookOpen className="text-teal-600" size={18} />
                </div>
                <p className="text-sm text-gray-600">Unlock millions of answers</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#ECF7F5] rounded-full flex items-center justify-center mr-3">
                  <DollarSign className="text-teal-600" size={18} />
                </div>
                <p className="text-sm text-gray-600">Try it free for 30 days</p>
              </div>
            </div>

            {/* Plan Selection */}
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                    selectedPlan === 'yearly' 
                      ? 'border-teal-500 bg-teal-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan('yearly')}
                >
                  <div className="flex items-center mb-1">
                    <input 
                      type="radio" 
                      checked={selectedPlan === 'yearly'}
                      onChange={() => setSelectedPlan('yearly')}
                      className="text-teal-500"
                    />
                    <span className="ml-2 font-semibold text-sm">Yearly</span>
                  </div>
                  <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded mb-1 inline-block">Save 43%</span>
                  <p className="text-teal-600 font-semibold">$3.99/mo</p>
                </div>
                
                <div 
                  className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                    selectedPlan === 'monthly' 
                      ? 'border-teal-500 bg-teal-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  <div className="flex items-center mb-1">
                    <input 
                      type="radio" 
                      checked={selectedPlan === 'monthly'}
                      onChange={() => setSelectedPlan('monthly')}
                      className="text-blue-500"
                    />
                    <span className="ml-2 font-semibold text-sm">Monthly</span>
                  </div>
                  <p className="text-gray-600 font-semibold mt-4">$6.99/mo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Trial Info */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">30-day free trial</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Starting September 3, 2025</span>
                <span>$47.88/yr</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Your subscription will renew automatically each year. Cancel at any time in settings.
              </p>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 mb-4">
              By signing up for a subscription, you agree to jeread's{' '}
              <a href="#" className="text-teal-600 underline">Subscriber Terms of Service</a>.
            </p>

            {/* Payment Methods */}
            <div className="space-y-2 mb-3">
              <button 
                className="w-full bg-gray-500 hover:bg-[#00D66F]/80 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                onClick={() => setShowLinkModal(true)}
              >
                Pay with link
              </button>
              
              <button 
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                onClick={() => setShowBkashModal(true)}
              >
                bKash
              </button>
            </div>

            <div className="text-center text-gray-400 text-sm mb-3">OR</div>

            {/* Card Input */}
            <div className="mb-4">
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full pl-12 pr-20 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-800"
                     onClick={() => {
                       setCardNumber('4532 1234 5678 9012');
                     }}
                >
                  Autofill link
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Existing subscriptions will also be charged to this card. You may receive a temporary authorization 
                charge to validate your card.{' '}
                <a href="#" className="text-blue-600 underline">Learn more</a>.
              </p>
            </div>

            {/* Try Free Button */}
            <button 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
              onClick={() => setShowCardModal(true)}
            >
              Try 30 Days Free
            </button>
          </div>
        </div>

        {/* Pay with Link Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Pay with Link</h3>
                <button 
                  onClick={() => {
                    setShowLinkModal(false);
                    setLinkEmail('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">📧</span>
                </div>
                <p className="text-sm text-gray-600">Enter your email to receive payment link</p>
              </div>
              
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={linkEmail}
                  onChange={(e) => setLinkEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button 
                onClick={() => {
                  setTimeout(() => {
                    alert('Payment link sent to your email!');
                    setShowLinkModal(false);
                    setLinkEmail('');
                  }, 1000);
                }}
                disabled={!linkEmail.includes('@')}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Send Payment Link
              </button>
            </div>
          </div>
        )}

        {/* Card Payment Modal */}
        {showCardModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Card Payment</h3>
                <button 
                  onClick={() => {
                    setShowCardModal(false);
                    setCardName('');
                    setCardExpiry('');
                    setCardCvv('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <CreditCard className="text-blue-600" size={24} />
                </div>
                <p className="text-sm text-gray-600">Complete your card details</p>
                <p className="text-xs text-gray-500 mt-1">Amount: {selectedPlan === 'yearly' ? '$47.88' : '$6.99'}</p>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    maxLength="5"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    maxLength="3"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button 
                onClick={() => {
                  setTimeout(() => {
                    alert('Payment Successful! Welcome to jeread+');
                    setShowCardModal(false);
                    setCardName('');
                    setCardExpiry('');
                    setCardCvv('');
                  }, 2000);
                }}
                disabled={!cardNumber || !cardName || !cardExpiry || !cardCvv}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Complete Payment
              </button>
            </div>
          </div>
        )}

        {/* bKash Payment Modal */}
        {showBkashModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">bKash Payment</h3>
                <button 
                  onClick={() => {
                    setShowBkashModal(false);
                    setBkashStep(1);
                    setBkashPhone('');
                    setBkashPin('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {bkashStep === 1 && (
                <div>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-pink-600 font-bold text-lg">bK</span>
                    </div>
                    <p className="text-sm text-gray-600">Enter your bKash account number</p>
                  </div>
                  
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="01XXXXXXXXX"
                      value={bkashPhone}
                      onChange={(e) => setBkashPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <button 
                    onClick={() => setBkashStep(2)}
                    disabled={bkashPhone.length < 11}
                    className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}

              {bkashStep === 2 && (
                <div>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-pink-600 font-bold text-lg">bK</span>
                    </div>
                    <p className="text-sm text-gray-600">Enter your bKash PIN</p>
                    <p className="text-xs text-gray-500 mt-1">Amount: {selectedPlan === 'yearly' ? '$47.88' : '$6.99'}</p>
                  </div>
                  
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Enter 5-digit PIN"
                      value={bkashPin}
                      onChange={(e) => setBkashPin(e.target.value)}
                      maxLength="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-center text-2xl tracking-widest"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setBkashStep(1)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setBkashStep(3)}
                      disabled={bkashPin.length !== 5}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}

              {bkashStep === 3 && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-2xl">✓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Successful!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your jeread+ subscription has been activated.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Transaction ID: bK{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                  <button 
                    onClick={() => {
                      setShowBkashModal(false);
                      setBkashStep(1);
                      setBkashPhone('');
                      setBkashPin('');
                    }}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Continue to jeread+
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}