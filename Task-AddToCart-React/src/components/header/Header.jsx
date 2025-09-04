import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import CartModel from "../cartModel/CartModel";

const Header = ({ cartCount, cartProducts, removeFromCart }) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo2.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl font-bold text-gray-800">
            Swetha<span className="text-blue-600">Mart</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="relative text-gray-600 hover:text-blue-600"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount > 0 ? cartCount : 0}
            </span>
          </button>
        </div>
      </div>
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl mx-4">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-3xl font-bold transition"
              onClick={() => setShowCart(false)}
              aria-label="Close cart"
            >
              &times;
            </button>

            <CartModel
              cartProducts={cartProducts}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
