// pages/payment.js
"use client";
import { useState } from "react";
import Head from "next/head";
import { CreditCard, Lock } from "lucide-react";

const orderDetails = {
  items: [
    { id: 1, name: "Product 1", price: 19.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 29.99, quantity: 2 },
  ],
  subtotal: 79.97,
  shipping: 4.99,
  tax: 8.5,
  discount: 0,
  total: 93.46,
};

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center">
        <input
          id="card-payment"
          name="payment-method"
          type="radio"
          className="h-4 w-4 text-blue-600"
          checked={paymentMethod === "card"}
          onChange={() => setPaymentMethod("card")}
        />
        <label htmlFor="card-payment" className="ml-3 flex items-center">
          <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-700">Credit or Debit Card</span>
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="paypal-payment"
          name="payment-method"
          type="radio"
          className="h-4 w-4 text-blue-600"
          checked={paymentMethod === "paypal"}
          onChange={() => setPaymentMethod("paypal")}
        />
        <label htmlFor="paypal-payment" className="ml-3">
          <span className="text-gray-700">PayPal</span>
        </label>
      </div>
    </div>
  );
};

const CardPaymentForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <InputField
      id="cardholder"
      label="Cardholder Name"
      placeholder="Name on card"
      required
    />
    <InputField
      id="cardnumber"
      label="Card Number"
      placeholder="1234 5678 9012 3456"
      required
    />
    <div className="grid grid-cols-2 gap-4">
      <InputField
        id="expiry"
        label="Expiry Date"
        placeholder="MM/YY"
        required
      />
      <InputField id="cvc" label="CVC" placeholder="123" required />
    </div>
    <div className="flex items-center mt-4">
      <Lock className="h-4 w-4 text-gray-500 mr-2" />
      <p className="text-sm text-gray-500">
        Your payment information is secure and encrypted
      </p>
    </div>
    <button
      type="submit"
      className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Complete Payment
    </button>
  </form>
);

const InputField = ({ id, label, placeholder, required }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const OrderSummary = ({ items, subtotal, shipping, tax, discount, total }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
    <div className="border-t border-gray-200 py-4">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between py-2">
          <div className="flex-1">
            <p className="text-gray-800">{item.name}</p>
            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
          </div>
          <p className="text-gray-800 font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
    <div className="border-t border-gray-200 py-4 space-y-3">
      <SummaryItem label="Subtotal" value={subtotal} />
      <SummaryItem label="Shipping" value={shipping} />
      <SummaryItem label="Tax" value={tax} />
      {discount > 0 && (
        <SummaryItem label="Discount" value={-discount} isDiscount />
      )}
    </div>
    <div className="border-t border-gray-200 pt-4 pb-2">
      <SummaryItem label="Total" value={total} isTotal />
    </div>
  </div>
);

const SummaryItem = ({ label, value, isDiscount, isTotal }) => (
  <div className="flex justify-between">
    <p
      className={
        isDiscount
          ? "text-green-600"
          : isTotal
          ? "text-gray-900 font-bold"
          : "text-gray-600"
      }
    >
      {label}
    </p>
    <p
      className={
        isDiscount
          ? "text-green-600"
          : isTotal
          ? "text-gray-900 font-bold text-xl"
          : "text-gray-800"
      }
    >
      ${value.toFixed(2)}
    </p>
  </div>
);

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [couponCode, setCouponCode] = useState("");
  const [showCouponField, setShowCouponField] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your payment processing logic here
    alert("Payment submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Checkout | Your Store Name</title>
        <meta name="description" content="Complete your purchase" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
              {paymentMethod === "card" ? (
                <CardPaymentForm onSubmit={handleSubmit} />
              ) : (
                <div className="text-center py-6">
                  <p className="mb-4 text-gray-700">
                    Click the button below to pay with PayPal
                  </p>
                  <button
                    type="button"
                    className="bg-yellow-400 text-blue-900 py-3 px-6 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                    onClick={handleSubmit}
                  >
                    Pay with PayPal
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-1">
            <OrderSummary
              items={orderDetails.items}
              subtotal={orderDetails.subtotal}
              shipping={orderDetails.shipping}
              tax={orderDetails.tax}
              discount={orderDetails.discount}
              total={orderDetails.total}
            />
            <div className="mt-4">
              {showCouponField ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300"
                    onClick={() => {
                      // Add coupon validation logic here
                      alert(`Applied coupon: ${couponCode}`);
                    }}
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="text-blue-600 text-sm hover:text-blue-800"
                  onClick={() => setShowCouponField(true)}
                >
                  Have a coupon code?
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
