'use client'
import Image from 'next/image';
import './adminDishes.sass'
import { useState, useEffect } from 'react';
import DishForm from './DishForm';

export default function AdminDishes({ selectedCategoryId }) {

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentDish, setCurrentDish] = useState(null);

  useEffect(() => {
    if (!selectedCategoryId) return;

    async function fetchDishesByCategory() {
      try {
        setLoading(true);
        const res = await fetch(`/api/dishes?categoryId=${selectedCategoryId}`);
        if (!res.ok) throw new Error('Error al cargar platillos');
        const data = await res.json();
        setDishes(data);
      } catch (error) {
        console.error('Error al cargar platillos:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDishesByCategory();
  }, [selectedCategoryId]);

  const handleEdit = (dish) => {
    setFormMode('edit');
    setCurrentDish(dish);
    setShowForm(true);
  };

  const handleAdd = () => {
    setFormMode('add');
    setCurrentDish(null);
    setShowForm(true);
  };

  const handleFormSubmit = (newDish) => {
    if (formMode === 'add') {
      setDishes([...dishes, newDish]);
    } else {
      setDishes(dishes.map((dish) => (dish.id === newDish.id ? newDish : dish)));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este platillo?')) {
      return; // Detiene la ejecución si el usuario cancela
    }
  
    try {
      const response = await fetch('/api/dishes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el platillo');
      }
  
      // Actualiza la lista de categorías al eliminar
      setDishes(dishes.filter((dish) => dish.id !== id));
      alert('Platillo eliminado correctamente');
    } catch (error) {
      console.error('Error eliminando el platillo:', error.message);
      alert('Hubo un problema al eliminar el platillo.');
    }
  };

  return(
    <div className="adminDishesContain">
      <header className="headerDishes">
        <h4 className="titleDish">Platillos</h4>
        <button className="btnAddDish" onClick={handleAdd}>
          Agregar
        </button>
      </header>


      {loading ? (
        <p>Cargando platillos...</p>
      ) : dishes.length > 0 ? (
        dishes.map((dish) => (
          <div key={dish.id} className="dishItem">
            <Image width={100} height={80} src={dish.image} alt={dish.name} />
            <div className="infoDish">
              <h5>{dish.name}</h5>
              <p>Precio: ${dish.price}</p>
            </div>
            <div className="btnDishContain">
              <button id='btnPutDish' onClick={() => handleEdit(dish)}>Editar</button>
              <button id='btnDelDish' onClick={() => handleDelete(dish.id)}>Eliminar</button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay platillos para esta categoría.</p>
      )}

      {showForm && (
        <DishForm
          mode={formMode}
          dish={currentDish}
          categoryId={selectedCategoryId}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}