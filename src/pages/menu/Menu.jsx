
'use client'
import CategorySlider from "@/components/menu/Category";
import DishGrid from "@/components/menu/DishGrid";
import { useState } from "react";
import './menu.sass'

const categories = [
  { id: 1, name: "Bebidas", image: "/images/category/bebidas.png" },
  { id: 2, name: "Cafes", image: "/images/category/cafeCalente.png" },
  { id: 3, name: "Cafes Frios", image: "/images/category/cafeFrio.png" },
  { id: 4, name: "Panaderia", image: "/images/category/panaderia.png" },
  { id: 5, name: "Platillos", image: "/images/category/platillos.png" },
  { id: 6, name: "Postres", image: "/images/category/postres.png" }
];

const dishes = {
  1: [
    { name: "Coca-cola 600ml", price: "$50", image: "/images/dishes/cocacola.jpg" },
    { name: "Té Verde 600ml", price: "$45", image: "/images/dishes/teVerde.jpg" },
    { name: "Matcha 600ml", price: "$65", image: "/images/dishes/matcha.jpg" },
    { name: "Agua natural 1L", price: "$15", image: "/images/dishes/aguaNatural.jpg" },
    { name: "Limonada 600ml", price: "$35", image: "/images/dishes/limonada.jpg" },
    { name: "Jugo verde 600ml", price: "$60", image: "/images/dishes/jugoVerde.jpg" },
    { name: "Jugo verde 600ml", price: "$60", image: "/images/dishes/jugoVerde.jpg" }
  ],
  2: [
    { name: "Enchiladas", price: "$120" },
    { name: "Chiles Rellenos", price: "$150" },
  ],
  3: [
    { name: "Pastel de Chocolate", price: "$80" },
    { name: "Helado", price: "$60" },
  ],
  4: [
    { name: "Hamburguesa Kids", price: "$90" },
    { name: "Deditos de Pollo", price: "$70" },
  ],
  5: [
    { name: "Hamburguesa Kids", price: "$90" },
    { name: "Deditos de Pollo", price: "$70" },
  ],
  6: [
    { name: "Hamburguesa Kids", price: "$90" },
    { name: "Deditos de Pollo", price: "$70" },
  ],
};

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <div className="menuContain">
      <h2>Nuestro Menu</h2>

      <div className="menuInner">
        <CategorySlider
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Grid de Platillos */}
        <DishGrid dishes={dishes[selectedCategory]} />
      </div>
    </div>
  );
}
