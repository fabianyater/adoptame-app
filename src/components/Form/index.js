import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { patternEmail } from '../../helpers/Helper'

import './styles.css'

const Form = (pet) => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false)

  const solicitud = {
    estado: 'Pendiente',
    mascota: {
      id: pet.pet?.id
    }
  }

  const onSubmit = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch('http://localhost:8081/adoptme/api/usuarios/', requestOptions)
      .then(response => response.json())

    setTimeout(() => {
      const requestOptionsS = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solicitud)
      };

      fetch(`http://localhost:8081/adoptme/api/solicitudes/${data.telefono}`, requestOptionsS)
        .then(response => response.json())
    }, 3000);

    const requestOptionsw = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: data.correo,
        msgBody: `Hola  <h1> ${data.nombre} ${data.apellido} </h1>, gracias por tu solicitud de adopción, en breve nos pondremos en contacto contigo al número ${data.telefono}.`,
        subject: 'Solicitud de adopción'
      })
    };
    fetch('http://localhost:8081/adoptme/api/correos/', requestOptionsw)
      .then(response => response.json())
      .then(data => console.log(data))

    setIsSubmitted(!isSubmitted)
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <div className='groups' >
          <div className='input-group'>
            <label htmlFor='nombre'>Nombre </label>
            <input type='text' id='nombre'{...register("nombre", { required: true })} />
            {errors.nombre && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='input-group'>
            <label htmlFor='apellido'>Apellido </label>
            <input type='text' id='apellido'{...register("apellido", { required: true })} />
            {errors.apellido && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='input-group'>
            <label htmlFor='correo'>Correo </label>
            <input type='email' id='correo'{...register("correo", { required: true, pattern: { patternEmail, message:'Correo inválido' } })} />
            {errors.correo && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='input-group'>
            <label htmlFor='direccion'>Dirección </label>
            <input type='text' id='direccion'{...register("direccion", { required: true })} />
            {errors.direccion && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='input-group'>
            <label htmlFor='telefono'>Teléfono </label>
            <input type='text' id='telefono'{...register("telefono", { required: true })} />
            {errors.telefono && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='input-group'>
            <label htmlFor='edad'>Edad </label>
            <input type='text' id='edad'{...register("edad", { required: true })} />
            {errors.edad && <span className='error' >Este campo es requerido</span>}
          </div>
        </div>

        <input type='submit' value='Enviar solicitud' className='button' />
      </form>
    </>
  /* ) :
    (
      <div className='card-solicitud'>
        <h2>Gracias por tu solicitud</h2>
        <p>En breve nos pondremos en contacto contigo</p>
      </div>
    ) */
  )
}

export default Form