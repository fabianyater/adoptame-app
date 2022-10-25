import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { Spinner } from '../../components/Spinner'
import { apiUrl } from '../../utils/env'

const NuevaCategoria = () => {
  const [loading, setLoading] = useState(false)

  const { handleSubmit, register, formState: { errors } } = useForm();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('token')}`
  }

  const categoryOnSubmit = async (data) => {
    setLoading(true)
    fetch(`${apiUrl}/categorias/agregar`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json()
        toast.success('Categoria creada')
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <div><Toaster position='top-center' /></div>
      <h2>Categorías</h2>
      <form onSubmit={handleSubmit(categoryOnSubmit)} >
        <div className='input-group'>
          <label htmlFor='nombre'>Nombre Categoria</label>
          <input type='nombre' id='nombre'{...register("nombre")} />
          {errors.nombre && <span className='error' >Este campo es requerido</span>}
        </div>
        <button type='submit' className='button edit' disabled={loading}>{loading ?
          <Spinner color="white" size={25} speed={1} lineWeight={5} />
          :
          'Actulizar'}
        </button>
      </form>
    </>
  )
}

export default NuevaCategoria