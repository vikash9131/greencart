// import { useEffect, useState } from "react";
// import axios from "axios";

// const Offers = () => {
//   const [offerProducts, setOfferProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/api/product/offers"
//         );

//         setOfferProducts(res.data.products); // adjust if needed

//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOffers();
//   }, []);

//   return (
//     <div className="px-4 md:px-10 py-10 min-h-[70vh]">

//       <h1 className="text-3xl font-bold mb-6 text-center">
//         🔥 Offers & Deals
//       </h1>

//       {loading ? (
//         <p className="text-center">Loading offers...</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {offerProducts.map((item) => (
//             <div key={item._id} className="border p-4">
              
//               <img
//                 src={item.image?.[0]}
//                 alt={item.name}
//                 className="w-full h-40 object-contain"
//               />

//               <h2>{item.name}</h2>

//               <p>
//                 ${item.offerPrice}{" "}
//                 <span className="line-through">${item.price}</span>
//               </p>

//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Offers;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const Offers = () => {
//   const [offerProducts, setOfferProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/api/product/offers"
//         );
//         setOfferProducts(res.data.products);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOffers();
//   }, []);

//   // ✅ Add to Cart handler (basic)
//   const handleAddToCart = (product) => {
//     console.log("Added to cart:", product);

//     // 👉 Later connect with your cart API or context
//     alert(`${product.name} added to cart`);
//   };

//   return (
//     <div className="px-4 md:px-10 py-10 min-h-[70vh]">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         🔥 Offers & Deals
//       </h1>

//       {loading ? (
//         <p className="text-center">Loading offers...</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {offerProducts.map((item) => (
//             <div
//               key={item._id}
//               className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
//             >
//               <img
//                 src={item.image?.[0]}
//                 alt={item.name}
//                 className="w-full h-40 object-contain mb-3"
//               />

//               <h2 className="font-semibold text-lg">{item.name}</h2>

//               <p className="mb-3">
//                 <span className="text-green-600 font-bold">
//                   ₹{item.offerPrice}
//                 </span>{" "}
//                 <span className="line-through text-gray-400">
//                   ₹{item.price}
//                 </span>
//               </p>

//               {/* ✅ BUTTON ADDED */}
//               <button
//                 onClick={() => handleAddToCart(item)}
//                 className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//               >
//                 Add to Cart 🛒
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Offers;


import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Offers = () => {
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/product/offers"
        );

        if (res.data.success) {
          setOfferProducts(res.data.products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="mt-20 px-4 md:px-10">

      {/* Header (same style as BestSeller) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-0.5 bg-primary rounded-full"></div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Special Deals
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            🔥 Offers & Deals
          </h2>

          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            Grab the best discounted products at unbeatable prices.
          </p>
        </div>

        <Link
          to="/products"
          className="text-primary font-medium mt-4 md:mt-0 hover:underline"
        >
          Browse All Products →
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-10 w-10 border-b-2 border-primary rounded-full"></div>
        </div>
      ) : offerProducts.length > 0 ? (

        /* Products Grid (same as BestSeller) */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {offerProducts.map((product, index) => (
            <div
              key={product._id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />

              {/* Discount Badge */}
              <div className="mt-2 flex justify-center">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-600">
                  {Math.round(
                    ((product.price - product.offerPrice) / product.price) * 100
                  )}
                  % OFF
                </span>
              </div>
            </div>
          ))}
        </div>

      ) : (
        /* Empty State */
        <div className="text-center py-16 text-gray-500">
          No offers available right now.
        </div>
      )}

      {/* Animation */}
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

export default Offers;