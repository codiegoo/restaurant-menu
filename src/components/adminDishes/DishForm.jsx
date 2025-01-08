import './dishForm.sass'
import { useState } from 'react';

export default function DishForm({ mode, dish,categoryId, onClose, onSubmit }) {
  const [name, setName] = useState(dish?.name || '');
  const [price, setPrice] = useState(dish?.price || '');
  const [description, setDescription] = useState(dish?.description || '');
  const [image, setImage] = useState(dish?.image || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = '/api/dishes';
    const method = mode === 'edit' ? 'PUT' : 'POST';
    const body = mode === 'edit' 
      ? JSON.stringify({ id: dish.id, name, price, description, image })
      : JSON.stringify({ name, price, description, image, categoryId });

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`Error ${mode === 'edit' ? 'editando' : 'creando'} platillo`);
      }

      const result = await response.json();
      onSubmit(result); // Notifica al componente principal para actualizar la lista
      onClose(); // Cierra el formulario
    } catch (error) {
      console.error(error.message);
    }
  };

  return(
    <section className="formCategoryContain">
      <form className="categoryForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre:"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio:"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción:"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Imagen (URL):"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <div className="formActions">
          <button type="submit">{mode === 'edit' ? 'Guardar cambios' : 'Agregar'}</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </section>
  )
}