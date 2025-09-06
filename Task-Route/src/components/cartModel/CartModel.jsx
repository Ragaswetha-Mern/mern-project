import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CartModel = ({ cartProducts, removeFromCart }) => {
  const total = cartProducts.reduce(
    (sum, product) => sum + parseInt(product.price),
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">
        Your Cart
      </h2>
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
          <ul className="divide-y divide-gray-200 mb-8">
            {cartProducts.map((product, idx) => (
              <li
                key={idx}
                className="py-4 flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-12 w-12 object-contain rounded-lg border"
                  />
                  <div>
                    <span className="block font-semibold text-gray-700">
                      {product.title}
                    </span>
                    <span className="block text-sm text-gray-400">
                      {product.price}
                    </span>
                  </div>
                </div>
                <button
                  className="ml-4 text-red-500 hover:text-red-700 p-2 rounded-full transition"
                  onClick={() => removeFromCart(product)}
                  title="Remove from cart"
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center font-bold text-2xl border-t pt-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition">
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartModel;
