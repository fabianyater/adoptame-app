import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';

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
    /* if (pet.id) {
      Object.keys(pet)?.forEach((element, index) => {
        console.log("hgjdsgjkdfgd", typeof Object.values(pet)[index] === 'object' ? Object.values((Object.keys(pet)[index]+'Id').id) : Object.values(pet), element)
        //setValue(typeof Object.values(pet)[index] === 'object' ? Object.values((Object.keys(pet)[index]+'Id').id) : Object.values(pet), element)
      });
    } */
    //TODO: setear los valores del formulario con los valores del pet
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pet])

  useEffect(() => {
    fetch('http://localhost:8081/adoptme/api/categorias/')
      .then(response => response.json())
      .then(data => setCategorias(data))

    fetch('http://localhost:8081/adoptme/api/razas')
      .then(response => response.json())
      .then(data => setRazas(data))

    fetch(`http://localhost:8081/adoptme/api/mascotas/${id}`)
      .then(response => response.json())
      .then(data => setPet(data))
  }, [id])

  const onSubmit = async (data) => {
    setLoading(true)
    fetch('http://localhost:8081/adoptme/api/mascotas', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, id, foto: pet.foto })
    })
      .then(response => response.json())
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

  const deletePet = () => {
    console.log("delete")
    fetch(`http://localhost:8081/adoptme/api/mascotas/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .finally(() => setLoading(false))
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='formCreatePet'>
        <div className='file-group'>
          {pet.foto && <img src={`data:image/jpeg;base64,${pet.foto}`} width={100} alt={pet.nombre} />}
          <div className='input-group'>
            <label htmlFor='foto'>Foto</label>
            <input type='file' ref={inputRef} onChange={handleImageChange} className='hide-input' name='foto' id='foto' /* {...register("foto", { required: true, })} */ />
            <button type='button' className='button' onClick={onButtonClick}>
              Subir Foto
            </button>
            {errors.foto && <span className='error' >Este campo es requerido</span>}
          </div>
        </div>
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
        <div className='groups'>
          <div className='select-group'>
            <label htmlFor='categoria'>Categoría</label>
            <select id='categoria' {...register('categoriaId.id', { required: true })} >
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

        <div className='buttons'>
        <button className='button delete' onClick={() => deletePet} disabled={loading}>{loading ?
            <Spinner color="white" size={25} speed={1} lineWeight={5} />
            :
            'Eliminar'}
          </button>
          <button type='submit' className='button edit' disabled={loading}>{loading ?
            <Spinner color="white" size={25} speed={1} lineWeight={5} />
            :
            'Actulizar'}
          </button>
        </div>

      </form>
    </>
  )
}

export default EditPet