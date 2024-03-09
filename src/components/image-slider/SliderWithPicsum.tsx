import React, { useEffect, useState } from "react";
import { data } from "./data";
import Image from "next/image";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function SliderWithPicsum({ url, limit }: { url: any; limit: any }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl: any) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=1&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);

        setLoading(false);
      }
    } catch (e: any) {
      setError(e.message);

      setLoading(false);
    }
  }

  function handlePrev() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading data ! </div>;
  }

  if (error !== null) {
    return <div>Error Occurred ! </div>;
  }

  return (
    <div className="p-10 w-[550px] h-[450px] relative flex items-center">
      <BsArrowLeftCircleFill
        onClick={handlePrev}
        className="w-10 h-10 text-blue-500 absolute left-12"
      />
      {images && images.length
        ? images.map((item: any, index) => (
            <Image
              key={item.id}
              src={item.download_url}
              alt={item.download_url}
              width={550}
              height={450}
              className={currentSlide === index ? "block" : "hidden"}
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="w-10 h-10 text-blue-500 absolute right-12"
      />

      <span className="absolute flex bottom-20 left-[36%] justify-center items-center">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                onClick={()=>setCurrentSlide(index)}
                className={`w-5 h-5 ml-2 rounded-full cursor-pointer ${
                  currentSlide === index ? "bg-gray-200" : "bg-blue-500"
                }`}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}

export default SliderWithPicsum;
