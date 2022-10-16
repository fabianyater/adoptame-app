import React from 'react'

const CustomSelect = ({ name, label, array, register, required }) => {
  return (
    <div className='input-group'>
      <label htmlFor={name}>{label}</label>
      <select id={name} {...register(name.id, { required })}>
        <option value=''>Seleccione una categoría</option>
        {array?.map(a => (
          <option key={a.id} value={a.id}>{a.nombre}</option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect