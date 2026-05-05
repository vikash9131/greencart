// import React, { useState, useEffect } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../assets/assets';

// // const BestSellers = () => {
// //   const { axios } = useAppContext();
// //   const navigate = useNavigate();
// //   const [bestSellers, setBestSellers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [sortBy, setSortBy] = useState('popular');

// //   // Sample product data - Replace with your actual API call
// //   useEffect(() => {
// //     // Uncomment this when you have API ready
// //     // const fetchBestSellers = async () => {
// //     //   try {
// //     //     const { data } = await axios.get('/api/products/best-sellers');
// //     //     if (data.success) {
// //     //       setBestSellers(data.products);
// //     //     }
// //     //   } catch (error) {
// //     //     console.error('Error fetching best sellers:', error);
// //     //   } finally {
// //     //     setLoading(false);
// //     //   }
// //     // };
// //     // fetchBestSellers();

// //     // Sample data for now
// //     const sampleProducts = [
// //       { _id: '1', name: 'Organic Green Tea', category: 'Beverages', price: 249, offerPrice: 199, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400', rating: 4.8, soldCount: 1250 },
// //       { _id: '2', name: 'Fresh Farm Eggs', category: 'Dairy & Eggs', price: 180, offerPrice: 149, image: 'https://images.unsplash.com/photo-1582722872445-4dc5f2e3c643?w=400', rating: 4.9, soldCount: 2100 },
// //       { _id: '3', name: 'Organic Honey', category: 'Natural Sweeteners', price: 399, offerPrice: 349, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', rating: 4.7, soldCount: 890 },
// //       { _id: '4', name: 'Fresh Strawberries', category: 'Fruits', price: 299, offerPrice: 249, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', rating: 4.6, soldCount: 1560 },
// //       { _id: '5', name: 'Almond Milk', category: 'Plant-Based', price: 199, offerPrice: 169, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', rating: 4.5, soldCount: 780 },
// //       { _id: '6', name: 'Whole Wheat Bread', category: 'Bakery', price: 89, offerPrice: 75, image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400', rating: 4.8, soldCount: 3200 },
// //       { _id: '7', name: 'Greek Yogurt', category: 'Dairy', price: 129, offerPrice: 99, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', rating: 4.7, soldCount: 1100 },
// //       { _id: '8', name: 'Mixed Nuts Pack', category: 'Dry Fruits', price: 599, offerPrice: 499, image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400', rating: 4.9, soldCount: 670 },
// //     ];
    
// //     setTimeout(() => {
// //       setBestSellers(sampleProducts);
// //       setLoading(false);
// //     }, 500);
// //   }, [axios]);

// //   const handleSort = (value) => {
// //     setSortBy(value);
// //     let sorted = [...bestSellers];
// //     switch(value) {
// //       case 'popular':
// //         sorted.sort((a, b) => b.soldCount - a.soldCount);
// //         break;
// //       case 'rating':
// //         sorted.sort((a, b) => b.rating - a.rating);
// //         break;
// //       case 'price-low':
// //         sorted.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
// //         break;
// //       case 'price-high':
// //         sorted.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
// //         break;
// //       default:
// //         break;
// //     }
// //     setBestSellers(sorted);
// //   };

// //   const renderStars = (rating) => {
// //     return (
// //       <div className="flex items-center gap-0.5">
// //         {[...Array(5)].map((_, index) => (
// //           <svg
// //             key={index}
// //             className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
// //             fill="currentColor"
// //             viewBox="0 0 20 20"
// //           >
// //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //           </svg>
// //         ))}
// //         <span className="ml-1 text-xs text-gray-600">({rating})</span>
// //       </div>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-96">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="pt-8 pb-16">
// //       {/* Hero Section */}
// //       <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 mb-12">
// //         <div className="max-w-3xl">
// //           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
// //             Best Sellers
// //           </h1>
// //           <p className="text-lg text-gray-600 mb-6">
// //             Discover our most popular products loved by thousands of customers. 
// //             Fresh, organic, and delivered straight to your door.
// //           </p>
// //           <div className="flex items-center gap-4">
// //             <div className="flex items-center gap-2">
// //               <span className="text-3xl font-bold text-primary">{bestSellers.length}</span>
// //               <span className="text-gray-600">Products</span>
// //             </div>
// //             <div className="w-px h-8 bg-gray-300"></div>
// //             <div className="flex items-center gap-2">
// //               <span className="text-3xl font-bold text-primary">10k+</span>
// //               <span className="text-gray-600">Happy Customers</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Sort Section */}
// //       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
// //         <h2 className="text-2xl font-semibold text-gray-800">
// //           Trending Products
// //         </h2>
// //         <div className="flex items-center gap-3">
// //           <label className="text-gray-600 text-sm">Sort by:</label>
// //           <select
// //             value={sortBy}
// //             onChange={(e) => handleSort(e.target.value)}
// //             className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
// //           >
// //             <option value="popular">Most Popular</option>
// //             <option value="rating">Highest Rated</option>
// //             <option value="price-low">Price: Low to High</option>
// //             <option value="price-high">Price: High to Low</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* Products Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {bestSellers.map((product) => (
// //           <div
// //             key={product._id}
// //             onClick={() => navigate(`/products/${product.category}/${product._id}`)}
// //             className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
// //           >
// //             {/* Product Image */}
// //             <div className="relative overflow-hidden bg-gray-100 h-56">
// //               <img
// //                 src={product.image}
// //                 alt={product.name}
// //                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
// //               />
// //               {product.offerPrice && (
// //                 <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
// //                   {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
// //                 </div>
// //               )}
// //               <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
// //                 Best Seller
// //               </div>
// //             </div>

// //             {/* Product Info */}
// //             <div className="p-5">
// //               <p className="text-xs text-gray-500 mb-1">{product.category}</p>
// //               <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary transition line-clamp-2">
// //                 {product.name}
// //               </h3>
              
// //               {/* Rating */}
// //               <div className="mb-3">
// //                 {renderStars(product.rating)}
// //               </div>

// //               {/* Price */}
// //               <div className="flex items-center gap-2 mb-3">
// //                 {product.offerPrice ? (
// //                   <>
// //                     <span className="text-2xl font-bold text-gray-800">₹{product.offerPrice}</span>
// //                     <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
// //                   </>
// //                 ) : (
// //                   <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
// //                 )}
// //               </div>

// //               {/* Sold Count */}
// //               <div className="flex items-center justify-between">
// //                 <span className="text-xs text-gray-500">
// //                   🔥 {product.soldCount}+ sold this month
// //                 </span>
// //                 <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dull">
// //                   View Deal
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Empty State */}
// //       {bestSellers.length === 0 && (
// //         <div className="text-center py-16">
// //           <img src={assets.empty_cart} alt="No products" className="mx-auto w-48 mb-4 opacity-50" />
// //           <h3 className="text-xl font-semibold text-gray-600">No best sellers found</h3>
// //           <p className="text-gray-500 mt-2">Check back later for our popular products!</p>
// //         </div>
// //       )}

// //       {/* Bottom CTA */}
// //       <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
// //         <h3 className="text-2xl font-bold text-gray-800 mb-3">
// //           Don't Miss Out on Our Best Deals!
// //         </h3>
// //         <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
// //           Subscribe to our newsletter and be the first to know about new products, exclusive offers, and seasonal specials.
// //         </p>
// //         <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
// //           <input
// //             type="email"
// //             placeholder="Enter your email"
// //             className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
// //           />
// //           <button className="bg-primary hover:bg-primary-dull text-white px-8 py-3 rounded-full font-medium transition">
// //             Subscribe
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BestSellers;


// import ProductCard from "../components/ProductCard";


// const BestSeller = () => {
//     const { products } = useAppContext();
//   return (
//     <div className='mt-16'>
//       <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
//         {products.filter((product)=> product.inStock).slice(0,5).map((product, index)=>(
//             <ProductCard key={index} product={product}/>
//         ))}
        
//       </div>
//     </div>
//   )
// }

// export default BestSeller
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