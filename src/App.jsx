import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";
import View from "./pages/View";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<Cart />} path="/cart" />
        <Route element={<Wishlist />} path="/wishlist" />
        <Route element={<View/>} path="/:id/view"/>
        <Route element={<Navigate to={'/'}/>} path="/*"/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
