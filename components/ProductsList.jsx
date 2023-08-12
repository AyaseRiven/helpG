
import { useState } from "react";
import Link from "next/link";

const ProductsList = () => {
    const [products, setProducts] = useState([
        {
          id: 1,
          name: "Product 1",
          price: 100,
          image: "/image/product1.jpg",
          quantity: 0,
        },
        {
          id: 2,
          name: "Product 2",
          price: 200,
          image: "/image/product2.jpg",
          quantity: 0,
        },
        {
          id: 3,
          name: "Product 3",
          price: 300,
          image: "/image/product3.jpg",
          quantity: 0,
        },
        {
          id: 4,
          name: "Product 4",
          price: 400,
          image: "/image/product4.jpg",
          quantity: 0,
        },
        // ... เพิ่มรายการสินค้าต่อไป
      ]);
  return (
    <div>
      <div className=" grid grid-cols-3 bg-slate-500 shadow-md">
        {products.map((product) => (
          // <div className='test'>
          <div className=" grid-cols-3 gap-4 ">
            {/* <ProductImage src={product.image} alt={product.name} width="100" height="100"/> */}
            <div className=" justify-center text-center bg-yellow-100">
            <img
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
            />
            <p>{product.name}</p>
            <p>Price: {product.price}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            {/* <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button> */}
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
            </div>
           
          </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
