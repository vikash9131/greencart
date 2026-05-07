
import React, { useState, useEffect } from 'react';
import ProductCard from "../components/ProductCard";
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const BestSeller = () => {
  const { products } = useAppContext();
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    const bestSellers = products
      .filter((product) => product.inStock)
      .sort((a, b) => (b.soldCount || b.rating || 0) - (a.soldCount || a.rating || 0))
      .slice(0, 8);
    setDisplayProducts(bestSellers);
  }, [products]);

  return (
    <div className="mt-20 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10 rounded-3xl"></div>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-0.5 bg-primary rounded-full"></div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Trending Now
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Best Sellers
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            Hand-picked favorites loved by our community. Fresh, organic, and delivered to your doorstep.
          </p>
        </div>
        
        <Link 
          to="/best-sellers" 
          className="group flex items-center gap-2 text-primary font-medium mt-4 md:mt-0 hover:gap-3 transition-all"
        >
          <span>View All Products</span>
          <svg 
            className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Product Grid */}
      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product, index) => (
            <div 
              key={product._id || index}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
              
              {index < 3 && (
                <div className="mt-2 flex justify-center">
                  <span className={`
                    text-xs font-bold px-3 py-1 rounded-full
                    ${index === 0 ? 'bg-yellow-400 text-yellow-900' : 
                      index === 1 ? 'bg-gray-300 text-gray-700' : 
                      'bg-orange-400 text-orange-900'}
                  `}>
                    #{index + 1} Best Seller
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-48 md:h-56 lg:h-64 mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Features Bar - Shipping & Payment */}
      <div className="mt-12 bg-white rounded-xl p-4 md:p-6 border border-gray-100 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          
          {/* Free Shipping */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">Free Shipping</p>
              <p className="text-xs md:text-sm text-gray-500">On some orders</p>
            </div>
          </div>

          {/* Secure Payment - Stripe */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">Secure Payment</p>
              <p className="text-xs md:text-sm text-gray-500">Powered by Stripe</p>
            </div>
          </div>

          {/* Fast Delivery */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">Fast Delivery</p>
              <p className="text-xs md:text-sm text-gray-500">Within 24-48 hours</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">24/7 Support</p>
              <p className="text-xs md:text-sm text-gray-500">Always here to help</p>
            </div>
          </div>

        </div>
      </div>

      {/* Stripe Badge */}
      <div className="mt-4 flex justify-center md:justify-end">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Secured by</span>
          <span className="font-semibold text-gray-500">Stripe</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" stroke="currentColor" strokeWidth={2} />
            <path d="M8 12l3 3 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default BestSeller;