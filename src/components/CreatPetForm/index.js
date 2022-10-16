import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Spinner } from '../Spinner/index'

import './styles.css'

const CreatePetForm = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  const [categorias, setCategorias] = useState([])
  const [razas, setRazas] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Crear Mascota'
  }, [])

  useEffect(() => {
    fetch('http://localhost:8081/adoptme/api/categorias/')
      .then(response => response.json())
      .then(data => setCategorias(data))

    fetch('http://localhost:8081/adoptme/api/razas')
      .then(response => response.json())
      .then(data => setRazas(data))
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImage(reader.result.split(',')[1])
    }
  }

  useEffect(() => {
  }, [categorias, razas])

  const onSubmit = async (data) => {
    data.foto = image
    console.log(data)
    setLoading(true)
    fetch('http://localhost:8081/adoptme/api/mascotas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLoading(false)
        reset()
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='formCreatePet'>
        <div className='groups'>
          <div className='input-group'>
            <label htmlFor='nombre'>Nombre </label>
            <input type='text' id='nombre'{...register("nombre", { required: true })} />
            {errors.nombre && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='input-group'>
            <label htmlFor='edad'>Edad </label>
            <input type='number' min='0' id='edad'{...register("edad", { required: true })} />
            {errors.edad && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='input-group'>
            <label htmlFor='peso'>Peso (kg) </label>
            <input type='number' min='0' id='peso'{...register("peso", { required: true })} />
            {errors.peso && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='input-group'>
            <label htmlFor='sexo'>Sexo</label>
            <input type='text' id='sexo'{...register("sexo", { required: true })} />
            {errors.sexo && <span className='error' >Este campo es requerido</span>}
          </div>
        </div>
        <div className='input-group'>
          <label htmlFor='descripcion'>Descripción</label>
          <input type='text' id='descripcion'{...register("descripcion", { required: true })} />
          {errors.descripcion && <span className='error' >Este campo es requerido</span>}
        </div>
        <div className='input-group'>
          <label htmlFor='foto'>Foto</label>
          <input type='file' id='foto'{...register("foto", { required: true, onChange: handleImageChange })} />
          {errors.foto && <span className='error' >Este campo es requerido</span>}
        </div>
        <div className='groups'>
          <div className='select-group'>
            <label htmlFor='categoria'>Categoría</label>
            <select id='categoria' {...register('categoriaId.id', { required: true })}>
              <option value=''>Seleccione una categoría</option>
              {categorias?.map(categoria => (
                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
              ))}
            </select>
            {errors.categoriaId && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='select-group'>
            <label htmlFor='raza'>Raza</label>
            <select id='raza' {...register('razaId.id', { required: true })}>
              <option value=''>Seleccione una raza</option>
              {razas?.map(raza => (
                <option key={raza.id} value={raza.id}>{raza.nombre}</option>
              ))}
            </select>
            {errors.razaId && <span className='error' >Este campo es requerido</span>}
          </div>
        </div>

        <button type='submit' className='button' disabled={loading}>{loading ?
          <Spinner color="white" size={25} speed={1} lineWeight={5} />
          :
          'Crear Mascota'}
        </button>

      </form>
    </>
  )
}

export default CreatePetForm