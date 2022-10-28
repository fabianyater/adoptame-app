import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from '../Spinner';

import { patternEmail } from '../../helpers/Helper';
import { apiUrl } from '../../utils/env';

import './styles.css'

const FormContact = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)



  const onSubmit = async (data) => {
    setLoading(true)

    const htmlModel = `
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; width: 100%; max-width: 500px; margin: 0 auto;">
      <h1 style="text-align: center; color: #f5f5f5; background-color: #3f51b5; padding: 10px; border-radius: 10px;">Adoptame please</h1>
      <h2 style="text-align: center;">Hola, ${data.nombre}</h2>. Gracias por hacernos saber tu opinión sobre Adoptame please. Nos pondremos en contacto contigo lo antes posible.
      <p style="text-align: center;">Correo: ${data.correo}</p>
      <p style="text-align: center;">Mensaje: ${data.descripcion}</p>
    </div>
    `

    fetch(`${apiUrl}/correos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: data.correo,
        msgBody: htmlModel,
        subject: 'Quejas y reclamos'
      })
    })
      .then(response => response.json())
      .finally(() => {
        setLoading(false)
        toast.success('Mensaje enviado correctamente')
        reset()
      })

  }

  return (
    <>
      <div><Toaster position='top-center' /></div>
      <div className='cc'>

        <div className="left">
          <h1 className='title' >Contáctanos</h1>
          <p className="text">Si tienes alguna duda o sugerencia, no dudes en escribirnos. En Adoptame please
            siempre hay alguien para resolver tus dudas o escuchar tus sugerencias.</p>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='formCreatePet'>
            <div className='groups'>
              <div className='input-group'>
                <label htmlFor='nombre'>Nombre </label>
                <input type='text' id='nombre'{...register("nombre", { required: true })} />
                {errors.nombre && <span className='error' >Este campo es requerido</span>}
              </div>
              <div className='input-group'>
                <label htmlFor='correo'>Correo</label>
                <input type='text' id='correo'{...register("correo", { required: true, pattern: patternEmail })} />
                {errors.correo && <span className='error' >Este campo es requerido</span>}
              </div>
            </div>
            <div className='input-group' id='other'>
              <label htmlFor='descripcion'>Descripción</label>
              <textarea id='descripcion' rows='5' {...register("descripcion", { required: true })} />
              {errors.descripcion && <span className='error' >Este campo es requerido</span>}
            </div>
            <button type='submit' className='button' disabled={loading}>{loading ?
              <Spinner color="white" size={25} speed={1} lineWeight={5} />
              :
              'Enviar correo'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormContact