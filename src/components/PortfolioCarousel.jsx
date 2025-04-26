import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const PortfolioCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchStart(0);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isFullscreen) {
        if (e.key === 'Escape') {
          handleCloseFullscreen();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        } else if (e.key === 'ArrowLeft') {
          prevSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  return (
    <div className="portfolio-carousel">
      <div 
        className="carousel-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={image}
              alt={`Portfolio item ${index + 1}`}
              className="carousel-image"
              onClick={handleImageClick}
            />
          </div>
        ))}
      </div>

      <button className="carousel-arrow left" onClick={prevSlide}>
        <FiChevronLeft size={24} />
      </button>
      <button className="carousel-arrow right" onClick={nextSlide}>
        <FiChevronRight size={24} />
      </button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {isFullscreen && (
        <div className="fullscreen-modal active" onClick={handleCloseFullscreen}>
          <img
            src={images[currentIndex]}
            alt={`Portfolio item ${currentIndex + 1}`}
            className="fullscreen-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="close-modal" onClick={handleCloseFullscreen}>
            <FiX size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioCarousel; 