import React from 'react'
import { useForm } from 'react-hook-form';
import { patternEmail } from '../../../helpers/Helper'
import { apiUrl, localApiUrl} from '../../../utils/env';


const Register = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch(`${apiUrl}/usuarios/register`, requestOptions)
      .then(response => response.json())
  }


  return (
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
          <input type='email' id='correo'{...register("correo", { required: true, pattern: { patternEmail, message: 'Correo inválido' } })} />
          {errors.correo && <span className='error' >Este campo es requerido</span>}
        </div>
        <div className='input-group'>
          <label htmlFor='contrasenia'>Contraseña </label>
          <input type='password' id='contrasenia'{...register("contrasenia", { required: true })} />
          {errors.contrasenia && <span className='error' >Este campo es requerido</span>}
        </div>
      </div>

      <input type='submit' value='Rgistrar administrador' className='button' />
    </form>
  )
}

export default Register