'use client'

import AdminCategory from '@/components/adminCategory/AdminCategory.jsx'
import './admin.sass'
import './login.sass'
import { useState } from "react"
import AdminDishes from '@/components/adminDishes/AdminDishes.jsx'

export default function admin() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (data.authenticated) {
      setIsAuthenticated(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId); // Actualiza la categoría seleccionada
  };

  if (!isAuthenticated) {
    return (
      <div className='loginContain'>
        <form onSubmit={handleLogin}>
          <h2>Inicio de Sesión</h2>
          <div className='inputContain'>
            <input
              type="text"
              placeholder="Usuario"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="adminContain">
      <header>
        <h2>Panel de Administración</h2>
        <button onClick={() => setIsAuthenticated(false)}>Cerrar Sesión</button>
      </header>
      <section className="adminInner">
        <AdminCategory onCategoryClick={handleCategoryClick}/>
        <AdminDishes selectedCategoryId={selectedCategoryId}/>
      </section>
    </div>
  );
}