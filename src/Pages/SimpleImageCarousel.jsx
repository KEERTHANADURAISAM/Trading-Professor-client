import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SimpleImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg", "/img6.jpg", "/img7.jpg", "/img8.jpg", "/img9.jpg", "/img10.jpg", "/img11.jpg", "/img12.jpg", "/img13.jpg", "/img14.jpg", "/img15.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 2-column layout */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* LEFT COLUMN - TEXT CONTENT */}
        <div className="w-full md:w-1/2 text-white space-y-4">           
      <h2 className="text-3xl md:text-4xl font-bold leading-tight">             
        Turn Your <span className="text-green-400">Profits</span> Into <span className="text-blue-400">Success</span>
      </h2>           
      <p className="text-lg text-gray-300">             
        Stop making emotional trades that lead to losses. Learn proven strategies to maximize profits while minimizing risks in every market condition.
      </p>           
      <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">             
        <li>Risk management techniques to protect your capital</li>             
        <li>Profit booking strategies for consistent gains</li>             
        <li>Stop-loss mastery to limit your losses</li>
        <li>Psychology of trading - overcome fear & greed</li>           
      </ul>
      
      <div className="flex items-center space-x-8 pt-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">85%+</div>
          <div className="text-xs text-gray-400">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">2LK</div>
          <div className="text-xs text-gray-400">Avg Monthly Profit</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">350+</div>
          <div className="text-xs text-gray-400">Students Trained</div>
        </div>
      </div>
    </div>

        {/* RIGHT COLUMN - CAROUSEL */}
        <div className="w-full md:w-1/2">
          <div className="w-full max-w-md mx-auto p-4">
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 bg-black flex items-center justify-center">
                      <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>

                {/* Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center space-x-2 py-4 bg-black/10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleImageCarousel;
