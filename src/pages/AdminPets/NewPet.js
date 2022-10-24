import React from 'react'
import { Link } from 'react-router-dom'
import CreatePetForm from '../../components/CreatPetForm'

const NewPet = () => {
  return (
    <>
      <Link to='/admin/mascotas/todas' className='back' style={{ width: 'max-content' }}>Volver</Link>
      <CreatePetForm />
    </>
  )
}

export default NewPet