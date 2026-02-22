import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/Header.css";
import logo from "./img/logo.jpeg";
import Login from "./Login";

function Header() {
  const [showLogin, setShowLogin] = useState(false);

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <img src={logo} width="100" height="50" alt="Shop Karo" />

        <div className="search">
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
          />
          <button>s</button>
        </div>

        <div className="headnav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cart">Cart</NavLink>

          {userId ? (
            <>
              <span className="username">Hi, {username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn" onClick={() => setShowLogin(true)}>Login</button>
          )}
        </div>
      </div>

      {showLogin && <Login close={() => setShowLogin(false)} />}
    </>
  );
}

export default Header;