import { useState, useEffect } from "react";
import Image from "next/image";
import "./categorySlider.sass";

export default function CategorySlider({ categories, selectedCategory, onSelectCategory }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Actualiza la categoría seleccionada al cambiar el índice
  useEffect(() => {
    onSelectCategory(categories[currentIndex]?.id || 1);
  }, [currentIndex, categories, onSelectCategory]);

  const handleLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleRight = () => {
    setCurrentIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (position) => {
    if (position === "left") handleLeft();
    if (position === "right") handleRight();
  };

  return (
    <div className="category-slider">
      <button onClick={handleLeft} className="arrow left-arrow">
        &lt;
      </button>
      <div className="slider">
        {categories.map((category, index) => {
          let position = "hidden";
          if (index === currentIndex) position = "center";
          else if (index === (currentIndex + 1) % categories.length) position = "right";
          else if (index === (currentIndex - 1 + categories.length) % categories.length) position = "left";

          return (
            <div
              key={category.id}
              className={`category-card ${position}`}
              onClick={() => handleCardClick(position)}
            >
              <Image
                src={category.image} // Asegúrate de tener estas imágenes en tu carpeta pública
                alt={category.name}
                width={position === "center" ? 150 : 100} // Cambia el tamaño dinámicamente
                height={position === "center" ? 150 : 100}
              />
              <h3 className="text">{category.name}</h3>
            </div>
          );
        })}
      </div>
      <button onClick={handleRight} className="arrow right-arrow">
        &gt;
      </button>
    </div>
  );
}
