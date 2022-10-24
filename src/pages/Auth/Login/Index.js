import React from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from '../../../components/Spinner';
import { useUserContext } from '../../../context/userContext';
import { patternEmail } from '../../../helpers/Helper';
import { localApiUrl } from '../../../utils/env';

import './styles.css'

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  const { setContextUser } = useUserContext();

  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch(`${localApiUrl}/usuarios/login`, requestOptions)
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
          toast.success('Bienvenido');
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        toast.error('Error al iniciar sesión');
      });

  }

  if (localStorage.getItem('token')) {
    window.location.href = '/admin/mascotas/agregar';
  }

  return (
    <>
    <div>
      <Toaster position='top-center' />
    </div>
      <div className='login'>
        <h1>Si eres un administrador, por favor ingresa tus credeciales e inicia sesión</h1>
        <p>Al iniciar sesión, podrás administrar las mascotas que se encuentran en adopción.</p>
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

          <button type='submit' value='Iniciar sesión' className='button' disabled={loading}>
            {loading ? <Spinner color="white" size={25} speed={1} lineWeight={5} /> : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Login