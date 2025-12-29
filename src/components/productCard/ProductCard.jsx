import { useContext, useState } from "react";
import { DollarSign } from "lucide-react";
import { CartContext } from "../../App";

function ProductCard({ product }) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isShow, setIsShow] = useState(false);
  const handleAddItem = () => {
    const newItem = [
      ...cartItems,
      { ...product, quantity: 1, subtotal: product.price.toFixed() },
    ];
    setCartItems(newItem);
    setIsShow(true);
  };

  const removeItem = (id) => {
    setCartItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
    setIsShow(false);
  };

  return (
    <>
      <div className="w-11/12 sm:w-full group hover:shadow-2xl hover:ring-2 hover:ring-gray-300/50 rounded-sm hover:scale-105 duration-200 transform transition-all ease-in-out z-10">
        <div className="h-80 w-full overflow-hidden p-3 ring-1 ring-gray-300/80 group-hover:ring-0  relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100"></span>
        </div>
        <div className="p-5 space-y-6 bg-gray-50/50">
          <h3 className="text-lg xl:text-xl text-gray-800 font-semibold capitalize line-clamp-1">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 capitalize line-clamp-3">
            {product.description}
          </p>
          <div className="w-full flex items-center justify-between">
            <span className="text-xl xl:text-2xl font-semibold flex items-center justify-center">
              <DollarSign className="size-4 xl:size-5" />
              <span>{product.price.toFixed()}</span>
            </span>
            {isShow ? (
              <button
                onClick={() => {
                  removeItem(product.id);
                }}
                className="text-base capitalize bg-gray-300/80 px-5 py-3 cursor-pointer rounded-md font-semibold outline-none border-none hover:scale-105 duration-200 transition-all ease-in-out"
              >
                remove to cart
              </button>
            ) : (
              <button
                onClick={handleAddItem}
                className="text-base capitalize bg-gray-300/80 px-4 py-2 xl:px-5 xl:py-3 cursor-pointer rounded-md font-semibold outline-none border-none hover:scale-105 duration-200 transition-all ease-in-out"
              >
                add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
