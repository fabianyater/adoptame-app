import React, { useEffect, useState } from 'react'
import PetCard from '../../components/PetCard'
import { Spinner } from '../../components/Spinner'

import whatsappLogo from '../../images/whatsapp-icon.png'

import './styles.css'

const Pets = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://oyster-app-mr6h4.ondigitalocean.app/adoptme/api/mascotas', 
    {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setPets(data)
        setLoading(false)
      })
  }, [])


  useEffect(() => {
    document.title = "Mascotas 🐶🐱🐔"
  }, [])

  return !loading ? (
    <div className='pet-container'>
      <h1>Adopta, no compres</h1>

      {pets.length === 0 ?
        <div className='empty'>
          <h2>Lo sentimos, no hay mascotas disponibles en este momento</h2>
          <p>Por favor, intenta más tarde</p>

          <a href='https://api.whatsapp.com/send?phone=573224680795'> Escríbenos a nuestro WhatsApp
            <img src={whatsappLogo} alt='Logo de WhatsApp' />
          </a>
        </div>
        : (
          <PetCard pets={pets} route='mascotas' link={true} />
        )}

    </div>
  ) :
    (
      <div className='spinner'>
        <Spinner />
      </div>
    )

}

export default Pets