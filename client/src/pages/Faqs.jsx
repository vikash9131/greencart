import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Faqs = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'ordering', name: 'Ordering' },
    { id: 'shipping', name: 'Shipping & Delivery' },
    { id: 'payment', name: 'Payment' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'account', name: 'Account' },
  ];

  const faqs = [
    // Ordering FAQs
    {
      id: 1,
      category: 'ordering',
      question: 'How do I place an order?',
      answer: 'Placing an order is easy! Simply browse our products, add items to your cart, proceed to checkout, enter your shipping details, and complete payment. You\'ll receive an order confirmation email immediately after.',
    },
    {
      id: 2,
      category: 'ordering',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it. Please contact our customer support team immediately with your order number. After 1 hour, orders are processed and cannot be changed.',
    },
    {
      id: 3,
      category: 'ordering',
      question: 'Do I need an account to place an order?',
      answer: 'Yes, creating an account allows you to track your orders, save addresses, and enjoy faster checkout. It only takes a minute to sign up!',
    },
    {
      id: 4,
      category: 'ordering',
      question: 'Can I place a bulk or wholesale order?',
      answer: 'Yes! For bulk or wholesale orders, please contact our business team at wholesale@greencart.com or call us at +91 98765 43210 for special pricing.',
    },

    // Shipping FAQs
    {
      id: 5,
      category: 'shipping',
      question: 'What are your shipping charges?',
      answer: 'We offer FREE shipping on all orders across India! No minimum order value required. Express delivery options are available at an additional cost.',
    },
    {
      id: 6,
      category: 'shipping',
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days. Express delivery (available at checkout) takes 1-2 business days. Delivery times may vary based on your location.',
    },
    {
      id: 7,
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within India. We\'re working on expanding to international destinations soon. Stay tuned!',
    },
    {
      id: 8,
      category: 'shipping',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email and SMS. You can also track your order in the "My Orders" section of your account.',
    },
    {
      id: 9,
      category: 'shipping',
      question: 'What if I\'m not home during delivery?',
      answer: 'Our delivery partner will attempt delivery up to 3 times. After 3 failed attempts, the order will be returned to us. You can reschedule delivery through the tracking link.',
    },

    // Payment FAQs
    {
      id: 10,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept Credit/Debit Cards (Visa, Mastercard, Amex), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD). All online payments are secured by Stripe.',
    },
    {
      id: 11,
      category: 'payment',
      question: 'Is Cash on Delivery available everywhere?',
      answer: 'COD is available in most major cities and towns across India. You can check availability at checkout by entering your pincode.',
    },
    {
      id: 12,
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use Stripe for payment processing with 256-bit SSL encryption. We never store your card details on our servers.',
    },
    {
      id: 13,
      category: 'payment',
      question: 'Do you offer EMI options?',
      answer: 'Yes! EMI options are available for orders above ₹3,000. You can select EMI during checkout with participating banks.',
    },
    {
      id: 14,
      category: 'payment',
      question: 'I was charged twice. What should I do?',
      answer: 'Don\'t worry! Duplicate charges are usually automatically refunded within 3-5 business days. If not, contact our support team with your order details.',
    },

    // Returns & Refunds FAQs
    {
      id: 15,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for most products. Items must be unused, in original packaging, and with tags attached. Some items like perishables cannot be returned.',
    },
    {
      id: 16,
      category: 'returns',
      question: 'How do I return an item?',
      answer: 'Go to "My Orders", select the order, click "Return Items", and follow the instructions. Our delivery partner will pick up the item from your address.',
    },
    {
      id: 17,
      category: 'returns',
      question: 'When will I receive my refund?',
      answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The amount will be credited to your original payment method.',
    },
    {
      id: 18,
      category: 'returns',
      question: 'Can I exchange an item instead of returning?',
      answer: 'Yes! You can exchange items for a different size or color. If the new item costs more, you\'ll pay the difference. If less, we\'ll refund the difference.',
    },
    {
      id: 19,
      category: 'returns',
      question: 'What if I receive a damaged or wrong item?',
      answer: 'We\'re sorry for the inconvenience! Please contact us within 48 hours of delivery with photos of the item. We\'ll arrange a free replacement or full refund.',
    },

    // Account FAQs
    {
      id: 20,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Login" at the top of the page, then select "Create Account". Enter your name, email, and password. You\'re all set!',
    },
    {
      id: 21,
      category: 'account',
      question: 'I forgot my password. What should I do?',
      answer: 'Click "Login", then "Forgot Password". Enter your registered email, and we\'ll send you a password reset link.',
    },
    {
      id: 22,
      category: 'account',
      question: 'How do I update my account information?',
      answer: 'Log in to your account, go to "Account Settings" or "Profile", and you can update your name, email, phone number, and saved addresses.',
    },
    {
      id: 23,
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can request account deletion by contacting our support team. Please note that this action is irreversible.',
    },
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-8 pb-16 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span onClick={() => navigate('/')} className="hover:text-primary cursor-pointer">Home</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">FAQs</span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          Can't find what you're looking for? Contact our support team and we'll be happy to help!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* FAQ Search */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search your question..."
          className="w-full px-5 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-medium text-gray-800 pr-4">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {openIndex === index && (
              <div className="px-5 pb-5">
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤔</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No FAQs found
          </h3>
          <p className="text-gray-500">
            Try selecting a different category or contact our support team.
          </p>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our customer support team is here to help! Reach out to us and we'll get back to you within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/contact')}
            className="bg-primary hover:bg-primary-dull text-white px-8 py-3 rounded-full font-medium transition shadow-md hover:shadow-lg"
          >
            Contact Support
          </button>
          <a
            href="mailto:support@greencart.com"
            className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-full font-medium transition border border-gray-200 shadow-sm hover:shadow"
          >
            Email Us
          </a>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
          <div className="text-2xl mb-1">📞</div>
          <p className="text-xs text-gray-500">Call Us</p>
          <p className="text-sm font-medium">+91 98765 43210</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
          <div className="text-2xl mb-1">⏰</div>
          <p className="text-xs text-gray-500">Support Hours</p>
          <p className="text-sm font-medium">24/7 Available</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
          <div className="text-2xl mb-1">💬</div>
          <p className="text-xs text-gray-500">Live Chat</p>
          <p className="text-sm font-medium">Quick Response</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
          <div className="text-2xl mb-1">📧</div>
          <p className="text-xs text-gray-500">Email</p>
          <p className="text-sm font-medium">support@greencart.com</p>
        </div>
      </div>
    </div>
  );
};

export default Faqs;