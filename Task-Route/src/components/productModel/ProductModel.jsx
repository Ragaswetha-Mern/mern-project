import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProductModel = ({ product, onClose, addToCart }) => {
  const location = useLocation();
  if (!product) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-20">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-4 flex flex-col md:flex-row items-center gap-8">
        <button
          style={{ position: 'absolute', top: 16, right: 16, zIndex: 20 }}
          className="text-gray-600 hover:text-red-600 text-2xl font-bold transition focus:outline-none"
          onClick={typeof onClose === 'function' ? onClose : undefined}
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-48 object-contain rounded-2xl border-2 border-blue-100 shadow mb-6 md:mb-0"
        />
        <div className="flex flex-col items-start w-full">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            {product.title}
          </h2>
          <p className="text-blue-600 font-bold text-xl mb-2">
            ₹{product.price}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 text-yellow-500 text-lg">
              <FontAwesomeIcon icon={faStar} />
              {product.rating?.rate ?? "-"}
            </span>
            <span className="text-gray-500 text-base">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>
          <p className="text-gray-700 mb-4 text-base">
            {product.description}
          </p>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-base font-semibold mb-4">
            Category: {product.category}
          </span>
          <div className="flex gap-4 mt-4 w-full">
            {location.pathname === "/" ? (
              <button
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-200 transition font-semibold w-full flex items-center justify-center gap-2"
                onClick={typeof onClose === 'function' ? onClose : undefined}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Continue Shopping
              </button>
            ) : (
              <Link 
                to="/"
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-200 transition font-semibold w-full flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Continue Shopping
              </Link>
            )}
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition font-semibold w-full flex items-center justify-center gap-2"
              onClick={typeof onClose === 'function' ? onClose : undefined}
            >
              <FontAwesomeIcon icon={faTimes} />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
