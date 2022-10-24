import React, { useEffect, useState } from 'react'
import CreatePetForm from '../../components/CreatPetForm'
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
    document.title = "Mascotas 🐶🐱🐔"
  }, [])

  return !loading ? (
    <div className='pet-container'>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Agregar mascota
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva mascota</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <CreatePetForm />
            </div>
          </div>
        </div>
      </div>
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