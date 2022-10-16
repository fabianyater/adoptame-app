import React from 'react'

import landing from '../../images/landing.png'
import whatsappLogo from '../../images/whatsapp-icon.png'
import facebook from '../../images/facebook.png'
import instagram from '../../images/instagram.png'

import './styles.css'

const Home = () => {

  return (
    <>
      <div className='landing'>
        <div className='landing-left'>
          <h2>Deja a una mascota ser parte de tu familia</h2>
          <p>Contáctanos y encuentra tu mejor compañía</p>
          <a className='whatsapp' href='https://api.whatsapp.com/send?phone=573144183873'> Escríbenos a nuestro WhatsApp
            <img src={whatsappLogo} alt='Logo de WhatsApp' />
          </a>
          <p>O, ecuéntranos en nuestras redes sociales</p>
          <div className='social-media'>
            <a href='https://www.facebook.com/adoptameplease' target='_blank' rel='noopener noreferrer' >
              <img src={facebook} alt='Logo de Facebook' />
            </a>
            <a href='https://www.instagram.com/adoptameplease/' target='_blank' rel='noopener noreferrer' >
              <img src={instagram} alt='Logo de Instagram' />
            </a>
          </div>
        </div>
        <img src={landing} alt='Imagen de presentación' className='landing-image' />
      </div>
    </>
  )
}

export default Home