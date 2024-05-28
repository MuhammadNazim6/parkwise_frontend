import React, { useState } from 'react';
import { FaCircle } from "react-icons/fa";


const UserCarousel = ({ carouselArr, lotDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? carouselArr.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === carouselArr.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const changeCarousel = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel md:rounded-tl-2xl relative w-full">
        <div
          className={`carousel-item w-full h-64 transition-opacity duration-500'
            }`}
        >
          <img
            src={carouselArr[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-64 object-cover md:rounded-tl-2xl"
          />
        </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button onClick={prevSlide} className="btn btn-circle btn-outline">
          ❮
        </button>
        <button onClick={nextSlide} className="btn btn-circle btn-outline">
          ❯
        </button>
      </div>
      <div className="absolute w-full bottom-0 flex justify-center mb-4">
        {carouselArr.map((x, index) => (
          <span
            key={index}
            className={`px-1 m-1 cursor-pointer text-xs ${index === currentIndex ? 'text-white' : 'text-gray-300'}`}
            onClick={() => changeCarousel(index)}
          >
           <FaCircle className='text-[8px]'/>

          </span>
        ))}
      </div>
    </div>
  );
};

export default UserCarousel;
