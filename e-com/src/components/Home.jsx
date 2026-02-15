import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(
    localStorage.getItem("userId")
  );
  
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (userId) {
      loadCart();
    } else {
      setCart([]); 
    }
  }, [userId]);

  function loadProducts() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Products error", err));
  }

  function loadCart() {
    fetch(`http://localhost:8080/cart/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("CART RESPONSE:", data);
        setCart(data);
      })
      .catch(err => console.error("Cart error", err));
  }

  function getQuantity(productId) {
    const item = cart.find(c => c.productId === productId);
    return item ? item.quantity : 0;
  }

  function addToCart(productId) {
    if (!userId) {
      navigate("/login");
      return; 
    }

    fetch(
      `http://localhost:8080/cart/add?userId=${userId}&productId=${productId}`,
      { method: "POST" }
    ).then(() => loadCart());
  }

  function removeFromCart(productId) {
    if (!userId) return;

    fetch(
      `http://localhost:8080/cart/remove?userId=${userId}&productId=${productId}`,
      { method: "POST" }
    ).then(() => loadCart());
  }

  return (
    <div className="product-grid">
      {products.map(p => (
        <div className="card" key={p.id}>
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>

          {userId ? (
            <div className="qty-box">
              <button
                disabled={getQuantity(p.id) === 0}
                onClick={() => removeFromCart(p.id)}
              >
                -
              </button>

              <span>{getQuantity(p.id)}</span>

              <button onClick={() => addToCart(p.id)}>+</button>
            </div>
          ) : (
            <button className="cart-button"onClick={() => navigate("/login")}>
              Login to Add
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
