import React, { useEffect, useState } from 'react'
import PetCard from '../../components/PetCard'
import { Spinner } from '../../components/Spinner'
import { localApiUrl} from '../../utils/env'

const AllPets = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${localApiUrl}/mascotas/todas`, {
      method: 'GET',
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
      {pets.length === 0 ?
        <div className='empty'>
          <h2>Aún no hay mascotas registradas</h2>
          <p>Intenta agregar una, c:</p>
        </div>
        : (
          <PetCard pets={pets} route='admin/mascotas/actualizar' showButtons={true} edit='Editar' deletebutton='Eliminar' />
        )}

    </div>
  ) :
    (
      <div className='spinner'>
        <Spinner />
      </div>
    )
}

export default AllPets