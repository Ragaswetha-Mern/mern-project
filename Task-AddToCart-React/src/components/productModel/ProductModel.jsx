import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStar } from "@fortawesome/free-solid-svg-icons";

const ProductModel = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold transition"
          onClick={onClose}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-40 w-40 object-contain mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            {product.title}
          </h2>
          <p className="text-blue-600 font-bold text-lg mb-2">
            ${product.price}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 text-yellow-500 text-base">
              <FontAwesomeIcon icon={faStar} />
              {product.rating?.rate ?? "-"}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>
          <p className="text-gray-600 text-center mb-4">
            {product.description}
          </p>
          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            Category: {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
