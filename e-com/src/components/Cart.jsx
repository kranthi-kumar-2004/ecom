import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    loadProducts();
    loadCart();
  }, [userId]);

  function loadProducts() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }

  function loadCart() {
    fetch(`http://localhost:8080/cart/${userId}`)
      .then(res => res.json())
      .then(data => setCart(data));
  }

  function add(productId) {
    fetch(
      `http://localhost:8080/cart/add?userId=${userId}&productId=${productId}`,
      { method: "POST" }
    ).then(loadCart);
  }

  function remove(productId) {
    fetch(
      `http://localhost:8080/cart/remove?userId=${userId}&productId=${productId}`,
      { method: "POST" }
    ).then(loadCart);
  }

  function getProduct(productId) {
    return products.find(p => p.id === productId);
  }

  const total = cart.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  if (cart.length === 0) {
    return <h2 className="empty">Your cart is empty 🛒</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.map(item => {
        const product = getProduct(item.productId);
        if (!product) return null;

        return (
          <div className="cart-item" key={item.productId}>
            <img src={product.image} alt={product.name} />

            <div className="details">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <div className="qty">
                <button onClick={() => remove(product.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => add(product.id)}>+</button>
              </div>
            </div>

            <div className="subtotal">
              ₹{product.price * item.quantity}
            </div>
          </div>
        );
      })}

      <div className="cart-total">
        <h3>Total: ₹{total}</h3>
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
