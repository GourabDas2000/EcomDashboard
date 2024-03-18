import "./App.css";
import Nav from "./assets/nav/Nav";
import Footer from "./assets/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./assets/signup/Signup";
import PrivetComponent from "./assets/privetcomponent/PrivetComponent";
import Logout from "./assets/logout/Logout";
import Login from "./assets/login/Login";
import AddProduct from "./assets/addProduct/AddProduct";
import Producs from "./assets/products/Producs";
import Updateproduct from './assets/updateproduct/Updateproduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route element={<PrivetComponent />}>
            <Route
              path="/"
              element={<Producs/>}
            ></Route>
            <Route
              path="/AddProduct"
              element={<AddProduct/>}
            ></Route>
            <Route
              path="/UpdateProduct/:id"
              element={<Updateproduct/>}
            ></Route>
            <Route Route path="/Logout" element={<Logout />}>
              {" "}
            </Route>{" "}
            <Route
              path="/Profile"
              element={<h1> This is Profile page </h1>}
            ></Route>
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;