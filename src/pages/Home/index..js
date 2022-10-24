import React from 'react'
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

const Home = () => {

  return (
    <>
      <div className='home' id='home'>
        <img src={landing} alt='Imagen de presentación' className='home__image' />
        <div className='home__text'>
          <h2>Bienvenido a adoptame please</h2>
          <p>Aquí encontrarás a tu nuevo amigo, y ayudar a que otros puedan encontrar un hogar.</p>
          <a className='whatsapp' href='https://api.whatsapp.com/send?phone=573144183873'> Contáctanos vía WhatsApp
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

    </>
  )
}

export default Home