import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import logo from '../../images/pet-logo.png'
import './styles.css'
import '../../hamburger.css'

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className='left-nav'>
        <Link to="/" className='logo'>
          <img src={logo} alt="Pet logo" />
        </Link>
        <h1> <Link to="/">
          Adoptame <span> please </span> 🐶
        </Link>
        </h1>
      </div>
      <nav className={open ? 'nav-active' : 'right-nav'}>
        <Link to="/">Inicio</Link>
        <Link to="admin/mascotas/agregar">Agregar Mascota</Link>
        <Link to="mascotas">Mascotas</Link>
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