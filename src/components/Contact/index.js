import React from 'react'

import './styles.css'

const Contact = ({ logo, logoFacebook, logoInstagram, logoCorreo }) => {
  return (
    <div className='contact'>
      <h2>Comunícate con nosotros</h2>
      <p>Nos encanta recibir familias dispuestas a brindarle amor a nuestras mascotas.</p>
      <h3>FUNDACIÓN RENACER SOCIAL</h3>
      <a className='whatsapp' href='https://api.whatsapp.com/send?phone=573144183873'> Contáctanos vía WhatsApp
        <img src={logo} alt='Logo de WhatsApp' />
      </a>
      <span>Encuentranos también en nuestras redes sociales</span>
      <div className='contact__social'>
        <a href='https://www.facebook.com/adoptameplease' target='_blank' rel='noreferrer'>
          <img src={logoFacebook} alt='Logo de Facebook' />
        </a>
        <a href='mailto:adoptameplease1@gmail.com'>
          <img src={logoCorreo} alt='Logo de Gmail' />
        </a>
        <a href='https://www.instagram.com/adoptameplease/' target='blank' rel='noreferer'>
          <img src={logoInstagram} alt='Logo de Instagram' />
        </a>
      </div>
    </div>
  )
}

export default Contact