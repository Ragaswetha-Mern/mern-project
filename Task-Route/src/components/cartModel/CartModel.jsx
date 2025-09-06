import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProductModel from "../productModel/ProductModel";

const CartModel = ({ cartProducts, removeFromCart }) => {
  // Local state for quantities
  const [quantities, setQuantities] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setQuantities(cartProducts.map(() => 1));
  }, [cartProducts]);

  const handleIncrease = (idx) => {
    setQuantities((prev) => prev.map((q, i) => (i === idx ? q + 1 : q)));
  };

  const handleDecrease = (idx) => {
    setQuantities((prev) => prev.map((q, i) => (i === idx && q > 1 ? q - 1 : q)));
  };

  const totalRaw = cartProducts.reduce(
    (sum, product, idx) => sum + parseFloat(product.price) * (quantities[idx] || 1),
    0
  );
  const discount = 0.10;
  const discountAmount = totalRaw * discount;
  const total = totalRaw.toFixed(2);
  const discountedTotal = (totalRaw - discountAmount).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-10 px-2 sm:px-8 w-full mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">🛒 Your Cart</h2>
    <Link to="/" className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-200 transition mt-24">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
          <span className="font-semibold">Continue Shopping</span>
        </Link>
      </div>
      {cartProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img
            src="/images/empty.webp"
            alt="Empty Cart"
            className="h-42 w-32 mb-6 opacity-70"
          />
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="mb-8 flex flex-col gap-6">
            {cartProducts.map((product, idx) => (
              <div key={idx} className="flex items-center bg-white rounded-xl shadow p-6 gap-6 hover:shadow-lg transition-all">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-20 w-20 object-contain rounded border"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-lg">
                    {product.title}
                    <button
                      className="ml-2 text-blue-600 hover:underline text-sm font-medium"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View
                    </button>
                  </div>
                  <div className="text-blue-700 font-bold text-lg mt-1">₹{product.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-200 text-lg font-bold"
                    onClick={() => handleDecrease(idx)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 font-bold text-lg">{quantities[idx] || 1}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-200 text-lg font-bold"
                    onClick={() => handleIncrease(idx)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
                  onClick={() => removeFromCart(product)}
                  title="Remove from cart"
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-8 mt-8 gap-6 bg-white rounded-xl shadow px-6 py-6">
            <div className="flex flex-col items-start">
              <span className="text-lg text-gray-500 font-medium">Total Amount</span>
              <span className="text-3xl font-extrabold text-blue-700 mt-2 line-through">₹{total}</span>
              <span className="text-green-700 font-bold text-lg mt-2">Prime user 10% offer applied!</span>
              <span className="text-3xl font-extrabold text-green-700 mt-2">₹{discountedTotal}</span>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-12 rounded-2xl font-bold text-xl shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-sm">
          <div className="relative bg-white border border-gray-200 shadow-2xl rounded-2xl p-8 w-full max-w-md mx-4 flex flex-col items-center">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold transition z-10 focus:outline-none"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <ProductModel 
              product={selectedProduct} 
              onClose={() => setSelectedProduct(null)}
              addToCart={(product) => {
                // You can implement add to cart logic here if needed
                setSelectedProduct(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModel;
