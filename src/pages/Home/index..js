import React, { useEffect, useState } from 'react'
import CustomSection from '../../components/CustomSection'

import landing from '../../images/pet.webp'
import whatsappLogo from '../../images/whatsapp-icon.png'
import facebookLogo from '../../images/facebook.png'
import instagramLogo from '../../images/instagram.png'
import correoLogo from '../../images/correo.png'
import family from '../../images/family.webp'
import pets from '../../images/pets.webp'
import we from '../../images/we.webp'

import './styles.css'
import Contact from '../../components/Contact'
import { apiUrl } from '../../utils/env'

const Home = () => {
  const [empresa, setEmpresa] = useState({})

  if (localStorage.getItem('token')) {
    window.location.href = '/admin/mascotas/todas';
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
        localStorage.setItem('empresa', JSON.stringify(data))
        setEmpresa(data)
      })
  }, [])

  return (
    <>
      <div className='home' id='home'>
        <img src={landing} alt='Imagen de presentación' className='home__image' />
        <div className='home__text'>
          <h2>Bienvenido a {empresa?.nombre}</h2>
          <p>Un proyecto de <strong>FUNDACIÓN RENACER SOCIAL</strong></p>
          <p>Aquí encontrarás a tu nuevo amigo, y ayudar a que otros puedan encontrar un hogar.</p>
          <a className='whatsapp' href={`https://api.whatsapp.com/send?phone=${empresa.telefono}`}> Contáctanos vía WhatsApp
            <img src={whatsappLogo} alt='Logo de WhatsApp' />
          </a>
        </div>
      </div>

      <div className='company__info' id='company__info'>
        <h2>Nuestra empresa</h2>
        <div className='sections'>
          <CustomSection
            image={we}
            title='¿Quiénes somos?'
            description='Estamos comprometidos con velar por el cuidado de animales que no cuentan con hogar. La intención es lograr que cada mascota pueda encontrar una familia que le brinde el amor que necesita.' />

          <CustomSection
            image={pets}
            title='Vision'
            description='Ser la empresa líder en el cuidado de animales en Colombia, con el fin de que cada mascota pueda encontrar una familia que le brinde el amor que necesita.' />

          <CustomSection
            image={family}
            title='Misión'
            description='Brindar un servicio de calidad, con el fin de que cada mascota pueda encontrar una familia que le brinde el amor que necesita.' />
        </div>
      </div>

      <div className='comments'>
        <h2 className='comments__title'>¿Qué dicen nuestros clientes?</h2>
        <p className='comments__text'>¡Pronto estaremos publicando los comentarios de nuestros clientes!</p>
      </div>

      <Contact logo={whatsappLogo} logoFacebook={facebookLogo} logoInstagram={instagramLogo} logoCorreo={correoLogo} />

      <address className='address' >{empresa.direccion}</address>

      <iframe id='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.246284285669!2d-75.60168228466961!3d1.6084463611366684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e244e15c86ead5d%3A0x2accc1a74d25835c!2sCra.%207%20%232a-2%2C%20Florencia%2C%20Caquet%C3%A1!5e0!3m2!1ses-419!2sco!4v1666676699157!5m2!1ses-419!2sco" width="600" height="450" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='address'></iframe>

    </>
  )
}

export default Home