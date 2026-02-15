import { useState } from "react";
import { useNavigate, Navigate ,Link} from "react-router-dom";
import "./css/Login.css";

function Login() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (userId) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://ecom-backend-3h0k.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid credentials");
        }
        return res.json();
      })
      .then((user) => {

        setError("");

        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);

        navigate("/", { replace: true });
      })
      .catch(() => {
        setError("Invalid username or password");
      });
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <p>
          Don't have account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
