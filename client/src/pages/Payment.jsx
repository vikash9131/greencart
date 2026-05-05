import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Payment = () => {
  const { axios, user, cartItems, setCartItems } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('stripe');

  // Calculate cart total manually
  const calculateTotal = () => {
    if (!cartItems || Object.keys(cartItems).length === 0) return 0;
    
    let total = 0;
    for (const id in cartItems) {
      const item = cartItems[id];
      const price = item.offerPrice || item.price || 0;
      total += price * (item.quantity || 1);
    }
    return total;
  };

  const total = calculateTotal();

  const paymentMethods = [
    { 
      id: 'stripe', 
      name: 'Credit/Debit Card', 
      icon: '💳', 
      description: 'Pay securely with Stripe - Visa, Mastercard, Amex' 
    },
    { 
      id: 'cod', 
      name: 'Cash on Delivery', 
      icon: '💵', 
      description: 'Pay when you receive your order' 
    },
  ];

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/');
      return;
    }

    if (!cartItems || Object.keys(cartItems).length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    setLoading(true);

    try {
      if (selectedMethod === 'stripe') {
        const { data } = await axios.post('/api/payment/create-checkout-session', {
          items: cartItems,
          userId: user._id,
        });

        if (data.success && data.sessionUrl) {
          window.location.href = data.sessionUrl;
        } else {
          toast.error('Payment initialization failed. Please try again.');
        }
      } else if (selectedMethod === 'cod') {
        const { data } = await axios.post('/api/order/place', {
          items: cartItems,
          userId: user._id,
          paymentMethod: 'cod',
          totalAmount: total,
          shippingAddress: user.address,
        });

        if (data.success) {
          toast.success('Order placed successfully!');
          setCartItems({});
          navigate('/my-orders');
        } else {
          toast.error(data.message || 'Failed to place order');
        }
      } else {
        toast.error('Please select a payment method');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8 pb-16 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span onClick={() => navigate('/cart')} className="hover:text-primary cursor-pointer">Cart</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Payment</span>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Choose Payment Method
        </h1>
        <p className="text-gray-500">
          Select your preferred way to pay
        </p>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>Payment Options</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">100% Secure</span>
        </h2>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                className="mt-1 w-4 h-4 accent-primary cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-medium text-gray-800">{method.name}</span>
                  {method.id === 'stripe' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Recommended</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{method.description}</p>
              </div>
              {selectedMethod === method.id && (
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </label>
          ))}
        </div>

        {/* Stripe Security Notice */}
        {selectedMethod === 'stripe' && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-blue-900">Secured by Stripe</p>
                <p className="text-xs text-blue-700 mt-0.5">
                  Your payment information is encrypted with 256-bit SSL security. 
                  We never store your card details.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* COD Notice */}
        {selectedMethod === 'cod' && (
          <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-orange-900">Cash on Delivery</p>
                <p className="text-xs text-orange-700 mt-0.5">
                  Please keep exact change ready. Delivery partner will collect payment at your doorstep.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Total Amount */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">Total Amount</span>
            <span className="font-bold text-2xl text-gray-800">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-full font-semibold text-white transition-all transform hover:scale-[1.02] ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dull shadow-lg hover:shadow-xl'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            selectedMethod === 'stripe' ? 'Pay Securely with Stripe' : 'Place Order (COD)'
          )}
        </button>

        {/* Trust Badges */}
        <div className="mt-6 flex justify-center gap-6">
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            256-bit SSL
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Buyer Protection
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;