import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from '../../components/Spinner';
import { apiUrl } from '../../utils/env';

const NuevaRaza = () => {
  const [loading, setLoading] = useState(false)

  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('token')}`
  }

  const onSubmit = async (data) => {
    setLoading(true)
    fetch(`${apiUrl}/razas/agregar`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json()
        toast.success('Raza creada')
        reset()
      })
      .finally(() => setLoading(false))
  }
  return (
    <>
      <div><Toaster position='top-center' /></div>
      <h2>Razas</h2>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className='input-group'>
          <label htmlFor='nombre'>Nombre Raza</label>
          <input type='nombre' id='nombre'{...register("nombre")} />
          {errors.nombre && <span className='error' >Este campo es requerido</span>}
        </div>
        <button type='submit' className='button edit' disabled={loading}>{loading ?
          <Spinner color="white" size={25} speed={1} lineWeight={5} />
          :
          'Agregar'}
        </button>
      </form>
    </>
  )
}

export default NuevaRaza