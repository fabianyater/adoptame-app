import React from 'react'
import { Link } from 'react-router-dom'

const PetCard = ({ pets, route, showButtons, link, edit, deletebutton }) => {
  return (
    <div className='pet-cards'>
      {pets.map(pet => (
        <div key={pet.id} className="card">
          <img src={`data:image/jpeg;base64,${pet.foto}`} alt={pet.nombre} className='pet-image' />
          <div className='pet-info'>
            <h2>{pet.nombre}, {pet.edad > 1 ? pet.edad + ' añitos' : pet.edad + ' añito'}</h2>
            {link && <Link to={`/${route}/${pet.id}`}>Ver más</Link>}
            {
              showButtons && (
                <>
                  {<Link to={`/${route}/${pet.id}`}>{edit}</Link>}
                </>
              )
            }

          </div>
        </div>
      ))}
    </div>
  )
}

export default PetCard