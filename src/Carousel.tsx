import React, { useEffect, useRef, useState } from "react";
import "./Carousel.css"; // Ensure the CSS is imported

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [currentIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Handle next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Handle keyboard controls
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle swipe gesture
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchStartX = e.touches[0].clientX;

    const handleTouchMove = (event: TouchEvent) => {
      const touchEndX = event.touches[0].clientX;
      const distance = touchStartX - touchEndX;

      if (distance > 50) {
        nextImage();
      } else if (distance < -50) {
        prevImage();
      }

      // Clean up touchmove event listener
      carouselRef.current?.removeEventListener("touchmove", handleTouchMove);
    };

    // Add touchmove event listener to the carouselRef
    if (carouselRef.current) {
      carouselRef.current.addEventListener("touchmove", handleTouchMove);
    }
  };

  return (
    <div className="carousel" ref={carouselRef} onTouchStart={handleTouchStart}>
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
            style={{ display: index === currentIndex ? "block" : "none" }}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" onClick={prevImage}>
        &#10094;
      </button>
      <button className="carousel-control-next" onClick={nextImage}>
        &#10095;
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
