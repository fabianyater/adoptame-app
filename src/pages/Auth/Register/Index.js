import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from '../../../components/Spinner';
import { patternEmail } from '../../../helpers/Helper'
import { apiUrl } from '../../../utils/env';


const Register = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch(`${apiUrl}/usuarios/register`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("data", data)
        toast.success('Registro exitoso');
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log("dsdfs", error)
        toast.error('Error al registrar');
      }
      );
  }


  return (
    <>
      <div> <Toaster position='top-center' /> </div>
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

        <button type='submit' value='Registrar administrador' className='button' disabled={loading}>
          {loading ? <Spinner color="white" size={25} speed={1} lineWeight={5} /> : 'Registrar administrador'}
        </button>

      </form>
    </>
  )
}

export default Register