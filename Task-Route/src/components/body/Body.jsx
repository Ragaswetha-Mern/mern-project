import React from "react";
import Card from "../card/Card";

function Body({ products, addToCart, cartProducts }) {
  return (
    <>
      <div className="flex relative mx-auto py-8 pt-16 mt-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 mt-8 mx-20 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              product={product}
              addToCart={addToCart}
              cartProducts={cartProducts}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Body;
