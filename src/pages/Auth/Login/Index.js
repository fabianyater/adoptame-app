import React from 'react'
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../../context/userContext';
import { patternEmail } from '../../../helpers/Helper';

const Login = () => {

  const { setContextUser } = useUserContext();

  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    const requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch('https://oyster-app-mr6h4.ondigitalocean.app/adoptme/api/usuarios/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.data.jwt) {
          setContextUser({
            correo: data.data.correo,
            token: data.data.jwt
          });
          
          localStorage.setItem('token', data.data.jwt);
          localStorage.setItem('correo', data.data.correo);
          window.location.href = '/admin/mascotas/agregar';
        }
      });

  }
  

  if (localStorage.getItem('token')) {
    window.location.href = '/admin/mascotas/agregar';
  }

  return (
    <>
      <h2>Si eres un administrador, por favor ingresa tus credeciales e inicia sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <div className='groups' >
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

        <input type='submit' value='Iniciar sesión' className='button' />
      </form>
    </>
  )
}

export default Login