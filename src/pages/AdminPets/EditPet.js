import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { apiUrl } from '../../utils/env';

const EditPet = () => {
  const { id } = useParams();
  const { handleSubmit, register, formState: { errors }, setValue } = useForm();
  const inputRef = useRef(null);

  const [categorias, setCategorias] = useState([])
  const [pet, setPet] = useState({})
  const [razas, setRazas] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Crear Mascota'
  }, [])

  useEffect(() => {
    setValue('nombre', pet.nombre)
    setValue('edad', pet.edad)
    setValue('sexo', pet.sexo)
    setValue('peso', pet.peso)
    setValue('categoriaId.id', pet.categoria?.id)
    setValue('razaId.id', pet.raza?.id)
    setValue('descripcion', pet.descripcion)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pet])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('token')}`
  }

  useEffect(() => {
    fetch(`${apiUrl}/categorias/`, {
      method: 'GET',
      headers
    })
      .then(response => response.json())
      .then(data => setCategorias(data))

    fetch(`${apiUrl}/razas/`, {
      method: 'GET',
      headers
    })
      .then(response => response.json())
      .then(data => setRazas(data))

    fetch(`${apiUrl}/mascotas/${id}`, {
      method: 'GET',
      headers
    })
      .then(response => response.json())
      .then(data => setPet(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onSubmit = async (data) => {
    setLoading(true)
    fetch(`${apiUrl}/mascotas/actualizar`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...data, id, foto: pet.foto })
    })
      .then(response => {
        response.json()
        toast.success('Mascota actualizada')
      })
      .finally(() => setLoading(false))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPet({ ...pet, foto: reader.result.split(',')[1] })
    }
  }

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div style={{width:'70%', margin:'0 auto'}}>

        <Toaster position='top-center' />
        <Link to='/admin/mascotas/todas' className='back' style={{width:'max-content'}}>Volver</Link>
        <form onSubmit={handleSubmit(onSubmit)} className='formCreatePet'>
          <div className='file-group'>
            {pet.foto && <img src={`data:image/jpeg;base64,${pet.foto}`} width={100} alt={pet.nombre} />}
            <div className='input-groups'>
              <label htmlFor='foto'>Foto</label>
              <input type='file' ref={inputRef} onChange={handleImageChange} className='hide-input' name='foto' id='foto' /* {...register("foto", { required: true, })} */ />
              <button type='button' className='button' onClick={onButtonClick}>
                Subir Foto
              </button>
              {errors.foto && <span className='error' >Este campo es requerido</span>}
            </div>
          </div>
          <div className='groups'>
            <div className='input-groups'>
              <label htmlFor='nombre'>Nombre </label>
              <input type='text' id='nombre'{...register("nombre", { required: true })} />
              {errors.nombre && <span className='error' >Este campo es requerido</span>}
            </div>
            <div className='input-groups'>
              <label htmlFor='edad'>Edad </label>
              <input type='number' min='0' id='edad'{...register("edad", { required: true })} />
              {errors.edad && <span className='error' >Este campo es requerido</span>}
            </div>
            <div className='input-groups'>
              <label htmlFor='peso'>Peso (kg) </label>
              <input type='number' min='0' id='peso'{...register("peso", { required: true })} />
              {errors.peso && <span className='error' >Este campo es requerido</span>}
            </div>
            <div className='input-groups'>
              <label htmlFor='sexo'>Sexo</label>
              <input type='text' id='sexo'{...register("sexo", { required: true })} />
              {errors.sexo && <span className='error' >Este campo es requerido</span>}
            </div>
          </div>
          <div className='input-groups' id='other'>
            <label htmlFor='descripcion'>Descripción</label>
            <input type='text' id='descripcion'{...register("descripcion", { required: true })} />
            {errors.descripcion && <span className='error' >Este campo es requerido</span>}
          </div>
          <div className='groups'>
            <div className='select-groups'>
              <label htmlFor='categoria'>Categoría</label>
              <select id='categoria' {...register('categoriaId.id', { required: true })} >
                <option value=''>Seleccionar</option>
                {categorias?.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                ))}
              </select>
              {errors.categoriaId && <span className='error' >Este campo es requerido</span>}
            </div>
            <div className='select-groups'>
              <label htmlFor='raza'>Raza</label>
              <select id='raza' {...register('razaId.id', { required: true })}>
                <option value=''>Seleccionar</option>
                {razas?.map(raza => (
                  <option key={raza.id} value={raza.id}>{raza.nombre}</option>
                ))}
              </select>
              {errors.razaId && <span className='error' >Este campo es requerido</span>}
            </div>
          </div>

          <div className='buttons'>
            {/* <button className='button delete' onClick={() => deletePet} disabled={loading}>{loading ?
            <Spinner color="white" size={25} speed={1} lineWeight={5} />
            :
            'Eliminar'}
          </button> */}
            <button type='submit' className='button edit' disabled={loading}>{loading ?
              <Spinner color="white" size={25} speed={1} lineWeight={5} />
              :
              'Actulizar'}
            </button>
          </div>

        </form>
      </div>
    </>
  )
}

export default EditPet