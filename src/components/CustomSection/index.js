import React from 'react'

import './styles.css'

const CustomSection = ({ image, title, description }) => {
  return (
    <>
      <div className='section'>
        <img src={image} alt='Imagen de presentación' className='section__image' />
        <div className='section__text'>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}

export default CustomSection