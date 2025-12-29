import { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        if (!data.ok) {
          throw new Error(`HTTP error! status:${data.status}`);
        }

        const res = await data.json();

        setProducts([...res]);
      } catch (err) {
        console.log(err, "error in fetching");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="w-11/12 xl:w-4/5 flex-col items-center justify-center space-y-10 py-7">
        <div className="w-full text-center space-y-3">
          <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold capitalize">
            Shop Smarter Faster
          </h2>
          <p className="text-gray-600 text-sm md:text-base xl:text-lg">
            Discover products, add them to your cart, and manage your shopping
            seamlessly
          </p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-items-center">
          {products?.map((product, idx) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </>
  );
}

export default AllProducts;
