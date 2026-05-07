
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