import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./css/Home.css";
import Loader from "./Loader";
function Home() {
  const navigate = useNavigate();
  const[loading,setLoading]=useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(
    localStorage.getItem("userId")
  );
  useEffect(()=>{
    loadProducts(true);
  },[]);
  useEffect(() => {
  const interval = setInterval(() => {
    loadProducts(false);
  }, 5000);

  return () => clearInterval(interval);
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
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Products error", err);
        setLoading(true);
  });
  }

  function loadCart() {
    fetch(`https://ecom-backend-3h0k.onrender.com/cart/${userId}`)
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
      `https://ecom-backend-3h0k.onrender.com/cart/add?userId=${userId}&productId=${productId}`,
      { method: "POST" }
    ).then(() => loadCart());
  }

  function removeFromCart(productId) {
    if (!userId) return;

    fetch(
      `https://ecom-backend-3h0k.onrender.com/cart/remove?userId=${userId}&productId=${productId}`,
      { method: "POST" }
    ).then(() => loadCart());
  }

  return (
    <>
    {loading?(<Loader/>):(
    <div className="product-grid">
      {products.map(p => (
        
        <div className="card" key={p.id}>
          <Link to={`/product/${p.id}`} className="product-link">
          <img src={p.image} alt={p.name} />
          </Link>
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
  )}
  </>
  );
}

export default Home;
