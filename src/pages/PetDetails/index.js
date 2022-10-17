import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Form from '../../components/Form';
import ErrorPage from '../ErrorPage';
import { Spinner } from '../../components/Spinner';

import './styles.css'

const PetDetails = () => {
  const { id } = useParams();

  const [pet, setPet] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:8080/adoptme/api/mascotas/${id}`)
      .then(response => response.json())
      .then(data => {
        setPet(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message)
        setError(true)
        setLoading(false)
      })

  }, [id])

  useEffect(() => {
    document.title = 'Adopta a ' + pet.nombre
  }, [pet])

  return !loading ? (
    <>
      <Link to='/mascotas' className='back'>Volver</Link>
      {!error ? (
        <>
          <div className='pet-details'>
            {pet.foto && <img src={`data:image/jpeg;base64,${pet.foto}`} width={100} alt={pet.nombre} />}
            <div className='pet-details__info'>
              <h2>{pet.nombre}, {pet.edad > 1 ? pet.edad + ' añitos' : pet.edad + ' añito'}</h2>
              <label>Desripción
                <p>{pet.descripcion}</p>
              </label>
              <div className='pet-details__tag'>
                <span>{pet.categoria?.nombre}</span>
                <span>{pet.raza?.nombre}</span>
                <span>{pet.estado === 'DISPONIBLE' ? 'Disponible' : 'Adoptado'}</span>
              </div>
            </div>
          </div><div className='form-info'>
            <h2>Haz feliz y sé feliz</h2>
            <p>Llena el formulario para realizar una solicitud y
              poder llevar este nuevo miembto a tu familia, 🤩</p>
          </div><Form pet={pet} />
        </>
      ) : (
        <div className='error-container'>
          <ErrorPage />
        </div>
      )}
    </>
  )
    :
    (
      <>
        <div className='spinner'>
          <Spinner size={70} />
        </div>
      </>
    )
}

export default PetDetails