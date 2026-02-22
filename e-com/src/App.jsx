import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Product from "./components/Product";
import Footer from "./components/Footer";

function Layout() {
  const location = useLocation();

  const hideLayout = ["/login", "/register"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <div className="app-container">
      {!hideLayout && <Header />}

      <div className="page-content" style={{ marginTop: hideLayout ? "0px" : "70px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
