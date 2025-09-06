import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
  <Link to="/" className="flex items-center gap-2 hover:text-blue-600">
            <FontAwesomeIcon icon={faHome} className="text-3xl" />
            <span className="text-xl font-bold text-gray-800">Home</span>
          </Link>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative text-gray-600 hover:text-blue-600">
            <FontAwesomeIcon icon={faShoppingCart} className="text-3xl" />
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-sm rounded-full w-7 h-7 flex items-center justify-center">
              {cartCount > 0 ? cartCount : 0}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
