import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from '../../components/Spinner';
import { apiUrl } from '../../utils/env';

import './configStyles.css'
import NuevaCategoria from './NuevaCategoria';
import NuevaRaza from './NuevaRaza';

const Configuracion = () => {
  const [empresa, setEmpresa] = useState({})
  const { handleSubmit, register, formState: { errors }, setValue } = useForm();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    fetch(`${apiUrl}/empresa/obtener`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Origin': '*',
        }
      })
      .then(response => response.json())
      .then(data => {
        setEmpresa(data)
      })
  }, [])

  useEffect(() => {
    setValue('nombre', empresa.nombre)
    setValue('email', empresa.email)
    setValue('telefono', empresa.telefono)
    setValue('direccion', empresa.direccion)
    setValue('facebook', empresa.facebook)
    setValue('instagram', empresa.instagram)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empresa])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('token')}`
  }

  const onSubmit = async (data) => {
    setLoading(true)
    fetch(`${apiUrl}/empresa/actualizar`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...data, id: empresa.id, logo: empresa.logo })
    })
      .then(response => {
        response.json()
        toast.success('Empresa actualizada')
      })
      .finally(() => setLoading(false))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setEmpresa({ ...empresa, logo: reader.result.split(',')[1] })
    }
  }

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div><Toaster position='top-center' /></div>
      <div className='config__container'>
        <div className='config__container--left'>
          <h2>Configuración</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='file-group'>
              {empresa.logo && <img src={`data:image/jpeg;base64,${empresa.logo}`} width={100} alt='Logo empresa' />}
              <div className='input-group'>
                <label htmlFor='logo'>Logo</label>
                <input type='file' ref={inputRef} onChange={handleImageChange} className='hide-input' name='logo' id='logo' /* {...register("foto", { required: true, })} */ />
                <button type='button' className='button' onClick={onButtonClick}>
                  Subir Logo
                </button>
                {errors.logo && <span className='error' >Este campo es requerido</span>}
              </div>
            </div>
            <div className='groups'>
              <div className='input-group'>
                <label htmlFor='nombre'>Nombre empresa</label>
                <input type='text' id='nombre'{...register("nombre", { required: true })} />
                {errors.nombre && <span className='error' >Este campo es requerido</span>}
              </div>
              <div className='input-group'>
                <label htmlFor='email'>Correo</label>
                <input type='email' id='email'{...register("email", { required: true })} />
                {errors.email && <span className='error' >Este campo es requerido</span>}
              </div>
              <div className='input-group'>
                <label htmlFor='telefono'>Teléfono</label>
                <input type='text' id='telefono'{...register("telefono", { required: true })} />
                {errors.telefono && <span className='error' >Este campo es requerido</span>}
              </div>
              <div className='input-group'>
                <label htmlFor='direccion'>Dirección</label>
                <input type='text' id='direccion'{...register("direccion", { required: true })} />
                {errors.direccion && <span className='error' >Este campo es requerido</span>}
              </div>
              <div className='input-group'>
                <label htmlFor='facebook'>Facebook</label>
                <input type='text' id='facebook'{...register("facebook", { required: true })} />
                {errors.facebook && <span className='error' >Este campo es requerido</span>}
              </div>
              <div className='input-group'>
                <label htmlFor='instagram'>Instagram</label>
                <input type='text' id='instagram'{...register("instagram", { required: true })} />
                {errors.instagram && <span className='error' >Este campo es requerido</span>}
              </div>
            </div>
            <div className='btn-group'>
              <button type='submit' className='button edit' disabled={loading}>{loading ?
                <Spinner color="white" size={25} speed={1} lineWeight={5} />
                :
                'Actulizar'}
              </button>
            </div>
          </form>
        </div>
        <div className='config__container--right'>
          <NuevaCategoria />
        </div>
        <div className='races'>
          <NuevaRaza />
        </div>
      </div>
    </>
  )
}

export default Configuracion