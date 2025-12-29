import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, AllProducts, ProductCart } from "./components";

export const CartContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <CartContext.Provider
        value={{ cartItems, setCartItems, isShow, setIsShow }}
      >
        <Header />
        <main className="w-full flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="/cart" element={<ProductCart />} />
          </Routes>
        </main>
      </CartContext.Provider>
    </>
  );
}

export default App;
