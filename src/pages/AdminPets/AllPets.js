import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PetCard from '../../components/PetCard'
import { Spinner } from '../../components/Spinner'
import { apiUrl } from '../../utils/env'

const AllPets = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiUrl}/mascotas/todas`, {
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
    document.title = "Mascotas ๐ถ๐ฑ๐"
  }, [])

  return !loading ? (
    <div className='pet-container'>
      <Link type="button" class="button" style={{width:'max-content'}} to='/admin/mascotas/agregar' >Crear Mascota</Link>
      {pets.length === 0 ?
        <div className='empty'>
          <h2>Aรบn no hay mascotas registradas</h2>
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