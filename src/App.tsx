import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch images from an API, or set up static images initially
    const loadImages = async () => {
      const fetchedImages = Array.from(
        { length: 5 },
        (_, i) => `https://picsum.photos/800/400?random=${i}`
      );
      setImages(fetchedImages);
    };

    loadImages();
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className="App">
      <h1>Image Carousel</h1>
      {images.length > 0 ? (
        <Carousel images={images} />
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default App;
