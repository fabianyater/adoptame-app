import React, { useEffect, useState } from 'react'
import { Spinner } from '../../components/Spinner'
import { apiUrl } from '../../utils/env'

import correoLogo from '../../images/correo.png'

import './requestStyles.css'

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiUrl}/solicitudes/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSolicitudes(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    document.title = "Solicitudes 🐶🐱🐔"
  }, [])

  return !loading ? (
    <div className='pet-container'>
      {solicitudes.length === 0 ?
        <div className='empty'>
          <h2>Aún no hay solicitudes</h2>
        </div>
        : (
          <div className='solicitudes'>
            {solicitudes.map(solicitud => (
              <div className='solicitud' key={solicitud.id}>
                <div className='solicitud__info'>
                  <h2>{solicitud.usuario?.nombre} {solicitud.usuario?.apellido}</h2>
                  <p>{solicitud.usuario?.correo} <a href={`mailto:${solicitud.usuario?.correo}`}>
                    <img src={correoLogo} alt='Logo de Gmail' />
                  </a> </p>
                </div>
                <span>Mascota solicitada: </span>
                <div className='solicitud__mascota'>
                  <img src={`data:image/jpeg;base64,${solicitud.mascota?.foto}`} alt={solicitud.mascota?.nombre} className='pet-image' />
                  <div className='solicitud__mascota__info'>
                    <p>{solicitud.mascota?.nombre}</p>
                    <p>{solicitud.mascota?.edad}</p>
                    <p>{solicitud.estado}</p>
                  </div>
                </div>
                <div className='solicitud__buttons'>
                  <button>Aceptar</button>
                  <button>Rechazar</button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
    :
    (
      <div className='spinner'>
        <Spinner />
      </div>
    )

}

export default Solicitudes