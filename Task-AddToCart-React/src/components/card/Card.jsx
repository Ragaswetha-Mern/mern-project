import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import ProductModel from "../productModel/ProductModel";

function Card({ product, addToCart, cartProducts }) {
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const inCart = cartProducts.some((item) => item.id === product.id);
    setIsClicked(inCart);
  }, [cartProducts, product.id]);

  const handleClick = () => {
    if (isClicked) {
      toast.error(`${product.title} already exists in cart!`);
    } else {
      toast.success(`${product.title} added to cart!`);
      addToCart(product);
    }
  };

  const handleTitleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 pb-20 flex flex-col items-center relative min-h-[340px] w-full">
      <img
        src={product.image}
        alt={product.title}
        className="h-32 w-32 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-700 md:text-base sm:text-sm mb-2 text-center break-words">
        <button
          className="text-blue-700 hover:underline"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            margin: 0,
            cursor: "pointer",
          }}
          onClick={handleTitleClick}
        >
          {product.title.length > 30
            ? product.title.slice(0, 30) + "..."
            : product.title}
        </button>
      </h3>
      <div className="absolute bottom-12 left-0 w-full flex items-center justify-between px-4">
        <span className="text-blue-600 font-bold text-base sm:text-sm">
          ${product.price}
        </span>
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition flex items-center"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
        </button>
      </div>
      <div className="absolute bottom-4 left-0 w-full flex items-center justify-center px-4">
        <span className="flex items-center gap-1 text-yellow-500 text-sm sm:text-sm">
          <FontAwesomeIcon icon={faStar} />
          {product.rating?.rate ?? "-"}
          <span className="text-gray-500 ml-1">
            ({product.rating?.count ?? 0})
          </span>
        </span>
      </div>
      {showModal && (
        <ProductModel product={product} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Card;
