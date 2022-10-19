import React, { useEffect, useState } from 'react'
import { Spinner } from '../../components/Spinner'

import './requestStyles.css'

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://oyster-app-mr6h4.ondigitalocean.app/adoptme/api/solicitudes',{
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
          <p>Intenta agregar una, c:</p>
        </div>
        : (
          <div className='solicitudes'>
            {solicitudes.map(solicitud => (
              <div className='solicitud' key={solicitud.id}>
                <h2>{solicitud.usuario?.nombre} {solicitud.usuario?.apellido}</h2>
                <p>{solicitud.usuario?.correo}</p>
                <p>{solicitud.usuario?.telefono}</p>
                <p>{solicitud.usuario?.direccion}</p>
                <p>{solicitud.fechaSolicitud}</p>
                <p>Nombre mascota: {solicitud.mascota?.nombre}</p>
                <p>Edad mascota: {solicitud.mascota?.edad}</p>
                <img src={`data:image/jpeg;base64,${solicitud.mascota?.foto}`} alt={solicitud.mascota?.nombre} className='pet-image' />
                <p>{solicitud.estado}</p>
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