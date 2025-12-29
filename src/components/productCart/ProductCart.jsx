import { useContext } from "react";
import { X, Minus, Plus, ShoppingBag, DollarSign } from "lucide-react";
import { CartContext } from "../../App";

function ProductCart() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleDeleteItem = (id) => {
    const newItems = [...cartItems].filter((cart) => cart.id !== id);

    setCartItems(newItems);
  };

  const handleAddItem = (id) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      setCartItems((prev) => {
        return prev.map((item) => {
          return item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      });
    }
    setCartItems((prev) =>
      prev.map((item) => {
        return item.id === id
          ? { ...item, subtotal: item.price.toFixed() * item.quantity }
          : item;
      })
    );
  };

  const reduceQuantity = (id) => {
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      setCartItems((prev) => {
        return prev.map((item) => {
          return item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        });
      });
    }

    if (existingItem.quantity <= 1) {
      setCartItems((prev) => {
        return prev.filter((item) => item.id !== id);
      });
    }
    setCartItems((prev) =>
      prev.map((item) => {
        return item.id === id
          ? { ...item, subtotal: item.price.toFixed() * item.quantity }
          : item;
      })
    );
  };

  const handleSubtotal = () => {
    return cartItems.reduce((acc, crr) => {
      return acc + parseInt(crr.subtotal);
    }, 0);
  };
  const subtotalPrice = handleSubtotal();
  let discount = 0;
  let total = subtotalPrice;

  if (subtotalPrice >= 500) {
    discount = (subtotalPrice / 100) * 10;
    total = subtotalPrice - discount;
  }

  return (
    <>
      {cartItems.length > 0 ? (
        <section className="w-11/12 xl:w-4/5 h-auto grid grid-cols-1 md:grid-cols-6 divide-y-2 md:divide-x-2 divide-gray-400/80 border-2 border-gray-400/80 my-10">
          <div className="md:col-span-4 space-y-6 px-4 lg:px-6 py-8 lg:py-10">
            <h4 className="text-lg text-gray-800 font-semibold tracking-wide">
              Shopping cart
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-b-gray-400/80 text-left text-sm font-semibold text-gray-600 uppercase">
                    <th className="p-2 xl:p-4"></th>
                    <th className="p-2 xl:p-4">Product</th>
                    <th className="p-2 xl:p-4">Name</th>
                    <th className="p-2 xl:p-4">Price</th>
                    <th className="p-2 xl:p-4">Quantity</th>
                    <th className="p-2 xl:p-4">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems?.map((item, idx) => {
                    return (
                      <tr
                        key={item.id}
                        className="border-b border-b-gray-400/80 hover:bg-gray-50 transition"
                      >
                        <td className="p-2 xl:p-4">
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-lg cursor-pointer border-none outline-none active:scale-105 duration-200 transform transition-all ease-in-out"
                          >
                            <X className="size-5 lg:size-6" />
                          </button>
                        </td>

                        <td className="p-2 xl:p-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover rounded-md border"
                          />
                        </td>

                        <td className="p-2 xl:p-4 text-sm lg:text-base md:font-medium text-gray-800 ">
                          {item.title}
                        </td>

                        <td className="p-2 xl:p-4 text-gray-600 text-sm lg:text-base">
                          <span className="flex items-center justify-center">
                            <DollarSign className="size-3 lg:size-4" />
                            {item.price.toFixed()}
                          </span>
                        </td>

                        <td className="p-2 xl:p-4">
                          <div className="flex items-center gap-1.5 md:gap-3">
                            <button
                              onClick={() => reduceQuantity(item.id)}
                              className="px-1 py-0.5 md:px-2 md:py-1 border rounded hover:bg-gray-200 cursor-pointer outline-none active:scale-105 duration-200 transform transition-all ease-in-out"
                            >
                              <Minus className="size-4 lg:size-5 text-gray-600" />
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleAddItem(item.id)}
                              className="px-1 py-0.5 md:px-2 md:py-1 border rounded hover:bg-gray-200 cursor-pointer outline-none active:scale-105 duration-200 transform transition-all ease-in-out"
                            >
                              <Plus className="size-4 lg:size-5 text-gray-600" />
                            </button>
                          </div>
                        </td>

                        <td className="p-2 xl:p-4 font-semibold text-gray-800">
                          <span className="flex items-center justify-center text-sm lg:text-base">
                            {" "}
                            <DollarSign className="size-3 lg:size-4" />{" "}
                            {item.subtotal}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6 px-4 lg:px-6 py-8 lg:py-10">
            <div className="border-b-2 border-gray-400/80 pb-5">
              <h4 className="text-lg text-gray-800 font-semibold tracking-wide">
                Cart total
              </h4>
            </div>
            <div className="w-full space-y-4 border-b-2 border-gray-400/80 pb-5">
              <div className="w-full flex items-start justify-between">
                <h6 className="text-base lg:text-lg capitalize font-semibold">
                  subtotal
                </h6>
                <span className="text-base lg:text-lg text-gray-600 font-semibold flex items-center justify-center">
                  <DollarSign className="size-4 lg:size-5" /> {subtotalPrice}
                </span>
              </div>
              <div className="w-full flex items-start justify-between">
                <h6 className="text-base lg:text-lg capitalize font-semibold">
                  Shipping
                </h6>
                <span className="text-base lg:text-lg text-gray-600 font-semibold capitalize">
                  free shipping
                </span>
              </div>
              <div className="w-full flex items-start justify-between">
                <h6 className="text-base lg:text-lg capitalize font-semibold">
                  discount <span className="text-gray-600">10%</span>
                </h6>
                <span className="text-base lg:text-lg text-gray-600 font-semibold capitalize flex items-center justify-center">
                  <DollarSign className="size-4 lg:size-5" />{" "}
                  {discount.toFixed()}
                </span>
              </div>
            </div>
            <div className="w-full flex items-start justify-between border-b-2 border-gray-400/80 pb-5">
              <h6 className="text-lg lg:text-xl capitalize font-bold text-gray-800">
                total
              </h6>
              <span className="text-lg lg:text-xl font-semibold capitalize text-gray-800 flex items-center justify-center">
                <DollarSign className="size-5 lg:size-6" /> {total.toFixed(2)}
              </span>
            </div>
          </div>
        </section>
      ) : (
        <div className="w-4/5 h-[80vh] text-gray-300 flex flex-col items-center justify-center gap-5">
          <ShoppingBag className="size-20" />
          <div className="text-center text-gray-500 space-y-2">
            <p className="text-2xl capitalize font-semibold ">
              your cart is empty
            </p>
            <p className="capitalize text-lg">
              add some product to get started
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCart;
