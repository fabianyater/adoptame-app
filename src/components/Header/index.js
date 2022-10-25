import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { apiUrl } from '../../utils/env';

import logo from '../../images/pet-logo.png'
import './styles.css'
import '../../hamburger.css'

const Header = () => {
  const [open, setOpen] = useState(false);
  const [empresa, setEmpresa] = useState({})

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const hideNav = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetch(`${apiUrl}/empresa/obtener`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Origin': '*',
        }
      })
      .then(response => response.json())
      .then(data => {
        setEmpresa(data)
      })
  }, [])

  return (
    <header className="header">
      <div className='left-nav'>
        <Link to="/" className='logo'>
          <img src={empresa.logo ? `data:image/jpeg;base64,${empresa?.logo}`: logo} alt='Logo de la empresa' />
        </Link>
        <h2> <Link to="/">
          {empresa?.nombre || 'Adoptame please 🐶'}
        </Link>
        </h2>
      </div>
      <nav className={open ? 'nav-active' : 'right-nav'}>
        <button className='hamburger hamburger--squeeze is-active custom' type="button" onClick={() => setOpen(!open)}>
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        {localStorage.getItem('token') ?
          <>
            <Link to="/admin/mascotas/todas" onClick={hideNav}>Mascotas</Link>
            <Link to="/admin/configuracion" onClick={hideNav}>Configuración</Link>
            <button type='button' className='button logout' onClick={logout} >Cerrar sesión</button>
          </>
          :
          <>
            <Link to="/" onClick={hideNav} >Inicio</Link>
            <Link to="/login" onClick={hideNav}>Inicia sesión</Link>
            <Link to="mascotas" onClick={hideNav}>Mascotas</Link>
          </>
        }
      </nav>

      <button className={open ? 'hamburger hamburger--squeeze is-active' : 'hamburger hamburger--squeeze'} type="button" onClick={() => setOpen(!open)}>
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </header>
  )
}

export default Header