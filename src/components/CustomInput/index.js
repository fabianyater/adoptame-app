import React from 'react'
import { useForm } from 'react-hook-form';
import './styles.css'

export const CustomInput = ({ onChange, name, label, minilabel, type, register, pattern = {}, required }) => {
const { formState: { errors } } = useForm();
  return (
    <div className='input-group'>
      <label htmlFor={name}>{label} <span>{minilabel}</span> </label>
      <input type={type} id={name} {...register(name, { required, onChange, pattern })} />
      {errors?.name && <span className='error'>Este campo es requerido</span>}
    </div>
  )
}