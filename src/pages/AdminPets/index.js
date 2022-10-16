import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import './styles.css'

const AdminPets = () => {
  const userName = 'María'
  const [active, setActive] = useState('agregar')

  const routes = [
    { name: 'Agregar mascota', path: 'agregar' },
    { name: 'Actualizar mascota', path: 'actualizar' },
    { name: 'Ver solicitudes', path: 'solicitudes' },
  ]

  useEffect(() => {
    document.title = 'Administrar Mascotas'
  }, [])

  return (
    <>
      <h2>Administrar Mascotas</h2>
      <p className='text'>Hola, {userName}. Aquí podrás administrar todas las mascotas. Podrás agregar una nueva mascota,
        actualizar sus datos, consultar qué mascotas han sido adoptadas y cuáles no.
        <strong>Vamos y agreguemos una nueva mascota para darle mucha felicidad a ella y a su nuevo dueño, 🥰</strong>
      </p>

      <nav className='subnav'>
        <ul>
          {
            routes.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={active === path ? 'active' : ''}
                  onClick={() => setActive(path)}
                >
                  {name}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>

      <div>
        <Outlet />
      </div>
    </>
  )
}

export default AdminPets