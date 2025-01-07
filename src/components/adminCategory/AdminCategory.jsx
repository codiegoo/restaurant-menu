'use client'
import Image from 'next/image'
import './adminCategory.sass'
import { useState } from 'react';
import { useEffect } from 'react';
import CategoryForm from './CategoryForm';

export default function AdminCategory() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fromulario

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentCategory, setCurrentCategory] = useState(null);

  // Fetch de las categorías al cargar el componente
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setFormMode('add');
    setCurrentCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setFormMode('edit');
    setCurrentCategory(category);
    setShowForm(true);
  };

  const handleFormSubmit = (newCategory) => {
    if (formMode === 'add') {
      setCategories([...categories, newCategory]);
    } else {
      setCategories(categories.map((cat) => (cat.id === newCategory.id ? newCategory : cat)));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      return; // Detiene la ejecución si el usuario cancela
    }
  
    try {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar la categoría');
      }
  
      // Actualiza la lista de categorías al eliminar
      setCategories(categories.filter((category) => category.id !== id));
      alert('Categoría eliminada correctamente');
    } catch (error) {
      console.error('Error eliminando categoría:', error.message);
      alert('Hubo un problema al eliminar la categoría.');
    }
  };
  

  return(
    <div className="adminCategoryContain">
      <header className="headerCategory">
        <h4 className='titleCategory'>Categorias</h4>
        <button className='btnAgregarCategoria' onClick={handleAdd}>Agregar</button>
      </header>
      {loading ? (
        <p>Cargando categorías...</p>
      ) : (
        categories.map((category) => (
          <div className="categoryInner" key={category.id}>
            <Image
              src={category.image}
              alt={category.name}
              width={100}
              height={80}
              placeholder="blur"
              blurDataURL="/placeholder-image.jpg" // Puedes usar un blur para mejorar la experiencia de carga
            />
            <div className="infoTextCategory">
              <h5>{category.name}</h5>
              <p>{category.description}</p>
            </div>
            <div className="btnCategory">
              <button id='btnEditarCategoria' onClick={() => handleEdit(category)}>Editar</button>
              <button id='btnEliminarCategoria' onClick={() => handleDelete(category.id)}>Eliminar</button>
            </div>
          </div>
        ))
      )}

      {showForm && (
        <CategoryForm
          mode={formMode}
          category={currentCategory}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}