import Body from "./components/body/Body";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "./utils/HttpProcessor";
import CartModel from "./components/cartModel/CartModel";
import ProductModel from "./components/productModel/ProductModel";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    setCartProducts((prev) => [...prev, product]);
    console.log(`${product.title} added to cart`);
  };

  const handleRemoveFromCart = (product) => {
    setCartCount((prev) => prev - 1);
    setCartProducts((prev) => prev.filter((item) => item.id !== product.id));
    console.log(`Product with id ${product.id} removed from cart`);
  };

  // Product details wrapper to get id from params and pass product
  const ProductDetailsWrapper = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((p) => String(p.id) === String(id));
    return (
      <ProductModel product={product} onClose={() => navigate(-1)} />
    );
  };

  return (
    <>
      <Header cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={
            <Body
              products={products}
              addToCart={handleAddToCart}
              cartProducts={cartProducts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartModel
              cartProducts={cartProducts}
              removeFromCart={handleRemoveFromCart}
            />
          }
        />
  {/* Product details modal is now handled in CartModel, not as a separate route */}
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
export default App;
