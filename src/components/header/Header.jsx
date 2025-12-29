import { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../App";

function Header() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <>
      <header className="w-full h-20 bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center sticky top-0 z-40">
        <nav className="w-11/12 xl:w-4/5  flex items-center justify-between">
          <div onClick={handleNavigation} className="cursor-pointer">
            <h1 className="text-lg md:text-xl xl:text-2xl text-shadow-2xs text-shadow-gray-600 font-bold capitalize text-gray-800">
              shopping cart app
            </h1>
          </div>
          <NavLink to="/cart">
            <div className="flex items-center justify-center gap-1 relative">
              <ShoppingCart className="size-6 xl:size-7 text-gray-600" />
              <span className="text-base md:text-lg capitalize font-semibold">
                Cart
              </span>
              <span className="absolute -top-4 left-2 bg-red-500 w-5 h-5 flex items-center justify-center font-semibold text-white rounded-full text-sm">
                {cartItems?.length === 0 ? 0 : cartItems?.length}
              </span>
            </div>
          </NavLink>
        </nav>
      </header>
    </>
  );
}

export default Header;
