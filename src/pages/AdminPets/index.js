import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ErrorPage from '../ErrorPage'

import './styles.css'

const AdminPets = () => {
  const userName = localStorage.getItem('correo');
  const [active, setActive] = useState('todas')

  const routes = [
    { name: 'Mascotas', path: 'todas' },
    { name: 'Solicitudes', path: 'solicitudes' },
    { name: 'Usuarios', path: 'agregar-usuario' },
  ]

  useEffect(() => {
    document.title = 'Administrar Mascotas'

  }, [])

  if (!localStorage.getItem('token')) {
    return <ErrorPage />
  }

  return (
    <>
      <div className='admin-container'>

        <h2>Administrar Mascotas</h2>
        <p className='text'>Hola, {userName}. Aquí podrás administrar todas las mascotas. Podrás agregar una nueva mascota,
          actualizar sus datos, consultar qué mascotas han sido adoptadas y cuáles no.
          <strong> Vamos y agreguemos una nueva mascota para darle mucha felicidad a ella y a su nuevo dueño, 🥰</strong>
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
      </div>
    </>
  )
}

export default AdminPets