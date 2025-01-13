
'use client'
import CategorySlider from "@/components/menu/Category";
import DishGrid from "@/components/menu/DishGrid";
import { useState, useEffect } from "react";
import './menu.sass'
import DishDetail from "@/components/dishDetails/DishDetail";


export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingDishes, setLoadingDishes] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Cargar las categorías al montar el componente
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Error al cargar categorías');
        const data = await res.json();
        setCategories(data);
        // Selecciona la primera categoría automáticamente
        if (data.length > 0) setSelectedCategory(data[0].id);
      } catch (error) {
        console.error('Error al cargar categorías:', error.message);
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

  // Cargar los platillos cada vez que se seleccione una categoría
  useEffect(() => {
    if (!selectedCategory) return;

    async function fetchDishes() {
      try {
        setLoadingDishes(true);
        const res = await fetch(`/api/dishes?categoryId=${selectedCategory}`);
        if (!res.ok) throw new Error('Error al cargar platillos');
        const data = await res.json();
        setDishes((prevDishes) => ({
          ...prevDishes,
          [selectedCategory]: data,
        }));
      } catch (error) {
        console.error('Error al cargar platillos:', error.message);
      } finally {
        setLoadingDishes(false);
      }
    }

    // Evita cargar si los platillos ya están en el estado
    if (!dishes[selectedCategory]) fetchDishes();
  }, [selectedCategory]);


  return (
    <div className="menuContain">
      <h2>Nuestro Menu</h2>
      <p>Puedes hacer click en cualquier platillo para ver sus detalles.</p>

      <div className="menuInner">
        {loadingCategories ? (
          <p>Cargando categorías...</p>
        ) : (
          <CategorySlider
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {loadingDishes ? (
          <p>Cargando platillos...</p>
        ) : (
          <DishGrid dishes={dishes[selectedCategory] || []} onDishClick={setSelectedDish} />
        )}
      </div>

      {/* Modal de detalles del platillo */}
      {selectedDish && (
        <DishDetail dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </div>
  );
}
