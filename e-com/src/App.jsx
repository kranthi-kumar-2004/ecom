import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Register from "./components/Register";

function App() {
  const userId=localStorage.getItem("usreId");
  return(
    <BrowserRouter>
          <Header/>
          <div className="page-content"style={{marginTop:"70px"}}>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/Cart" element={<Cart/>}/>
              <Route path="/Login" element={<Login/>}/>
              <Route path="/Register" element={<Register/>}/>
            </Routes>
           

          </div>
    </BrowserRouter>
  );
}

export default App
