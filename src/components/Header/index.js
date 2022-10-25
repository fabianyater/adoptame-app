import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import logo from '../../images/pet-logo.png'
import './styles.css'
import '../../hamburger.css'

const Header = () => {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const hideNav = () => {
    setOpen(false);
  }

  
  var retrievedObject = localStorage.getItem('empresa');
  
  const nombre = JSON.parse(retrievedObject).nombre.split(' ')[0];
  const nombre2 = JSON.parse(retrievedObject).nombre.split(' ')[1];
  const nombre3 = JSON.parse(retrievedObject).nombre.split(' ')[2];


  return (
    <header className="header">
      <div className='left-nav'>
        <Link to="/" className='logo'>
          <img src={logo} alt="Pet logo" />
        </Link>
        <h1> <Link to="/">
          {nombre} <span> {nombre2} </span> {nombre3}
        </Link>
        </h1>
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