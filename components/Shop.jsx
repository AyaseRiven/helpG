import { useState } from "react";
import Link from "next/link";
import ProductsList from "./ProductsList";
// const ProductImage = ({ src, alt }) => {
//   return <img src={src} alt={alt} />;
// };

const Shop = () => {
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: products.length + 1,
      name,
      price: parseFloat(price),
      image,
    };

    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
    setImage("");
  };
  // const [products, setProducts] = useState([
  //   { id: 1, name: 'Product 1', price: 100, image: '/images/product1.jpg' },
  //   { id: 2, name: 'Product 2', price: 200, image: '/images/product2.jpg' },
  //   { id: 3, name: 'Product 3', price: 300, image: '/images/product3.jpg' },
  //   { id: 4, name: 'Product 4', price: 400, image: '/images/product4.jpg' },
  //   // ... เพิ่มรายการสินค้าต่อไป
  // ]);
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Product 1",
//       price: 100,
//       image: "/image/product1.jpg",
//       quantity: 0,
//     },
//     {
//       id: 2,
//       name: "Product 2",
//       price: 200,
//       image: "/image/product2.jpg",
//       quantity: 0,
//     },
//     {
//       id: 3,
//       name: "Product 3",
//       price: 300,
//       image: "/image/product3.jpg",
//       quantity: 0,
//     },
//     {
//       id: 4,
//       name: "Product 4",
//       price: 400,
//       image: "/image/product4.jpg",
//       quantity: 0,
//     },
//     // ... เพิ่มรายการสินค้าต่อไป
//   ]);
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const addToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);

    // หากสินค้าอยู่ในตะกร้าแล้ว เพิ่มจำนวนสินค้าในตะกร้าเท่านั้น
    if (cart.some((item) => item.id === productId)) {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      productToAdd.quantity = 1;
      setCart([...cart, productToAdd]);
    }
  };

  const removeFromCart = (productId) => {
    const productToRemove = cart.find((product) => product.id === productId);

    if (productToRemove.quantity > 1) {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
    }
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.id.toString().includes(searchText)
    );
    setSearchResults(results);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const handleProductSelect = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    setSelectedProducts([...selectedProducts, selectedProduct]);
  };

  // const totalAmount = selectedProducts.reduce((total, product) => total + product.price, 0);

  const calculateTotal = () => {
    const total = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    return total.toFixed(2);
  };

  return (
    <div>
      <div className="text-center text-2xl">   
        <h1 className=" ">Product Management</h1>
        {/* รายการสินค้า */}
        <h1>Add New Product</h1>
      </div>

      {/* <Link href="/">Back to Products</Link> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      <h2>Products</h2>
      <div className=" w-full">
      <ProductsList />
      </div>
      

      {/* ค้นหาสินค้า */}
      <h2>Search Products</h2>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* รายการสินค้าที่ค้นหา */}
      {searchResults.map((product) => (
        <div key={product.id}>
          {/* <ProductImage src={products.image} alt={product.name} /> */}
          <img
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
          />
          <p>{product.name}</p>
          <p>Price: {product.price}</p>
          {/* <button onClick={() => handleProductSelect(product.id)}>Select</button> */}
          <button onClick={() => addToCart(product.id)}>Select</button>
        </div>
      ))}

      {/* ตะกร้าสินค้า */}
      <h2>Cart</h2>
      {cart.map((product) => (
        <div key={product.id}>
          {/* <ProductImage src={product.image} alt={product.name} /> */}
          <img
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
          />
          <p>{product.name}</p>
          <p>
            Price: {product.price} - Quantity: {product.quantity}
          </p>
          {/* <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button> */}
          <button onClick={() => removeFromCart(product.id)}>
            Remove from Cart
          </button>
        </div>
      ))}
      {selectedProducts.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
        </div>
      ))}
      {/* <p>Total: {totalAmount}</p> */}
      <p>Total: ${calculateTotal()}</p>

      <div className="w-96 bg-black shadow rounded">
        <Link href="/Test1">Back to Products</Link>
      </div>
    </div>
  );
};

export default Shop;
