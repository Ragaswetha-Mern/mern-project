import Body from "./components/body/Body";
import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "./utils/HttpProcessor";

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

  return (
    <>
      <Header
        cartCount={cartCount}
        cartProducts={cartProducts}
        removeFromCart={handleRemoveFromCart}
      />
      <Body
        products={products}
        addToCart={handleAddToCart}
        cartProducts={cartProducts}
      />
      <Footer></Footer>
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
