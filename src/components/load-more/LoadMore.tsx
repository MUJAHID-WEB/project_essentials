import React, { useEffect, useState } from "react";
import Image from "next/image";



interface Product {
    id: string;
    thumbnail:string;
    title: string;
}
function LoadMore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false)

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();

        console.log(result)
    //   setProducts(result.products);


    if(result && result.products && result.products.length > 0){
        setProducts((prevData)=> [...prevData, ...result.products]);
          setLoading(false);

    }else{
        setLoading(false);
    }
    } catch (e: any) {
      console.log(e);

      setLoading(false);
    }
  }


  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(()=>{
    if(products && products.length === 100) setDisable(true)
  },[products])

  if (loading) {
    <div className="p-5">Loading Data !!!</div>;
  }
  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-3">
        {products && products.length
          ? products.map((item: Product, index) => (
              <div
                key={`${item.id}_${index}`}
                className="flex flex-col border border-black w-[150px] justify-center items-center"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="p-2"
                />
                <p className="p-2 items-center">{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <button
      disabled={disable}
        onClick={()=>setCount(count + 1)}
        className="border border-red-400 p-3 bg-gray-400 text-white my-5"
      > Load More  </button>
    </div>
  );
}

export default LoadMore;
