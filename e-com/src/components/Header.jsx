import { Link ,useNavigate} from "react-router-dom";
import "./css/Header.css";
import logo from "./img/logo.jpeg";

function Header() {
  let name;
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const navigate=useNavigate();
  if(username==="krishna"){
    name="username";
  }else{
    name="uname";
  }

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="header">
      <img src={logo} width="100" height="50" alt="Shop Karo" />

      <input
        type="text"
        placeholder="Search for Products, Brands and More"
      />

      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      {userId ? (
        <>
          <span className={name}>Hi, {username}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Header;
