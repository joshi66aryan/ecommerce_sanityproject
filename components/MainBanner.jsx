import Link from 'next/link'
import React from 'react'
import { urlFor } from '../library/client'

const MainBanner = ({heroBanner}) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img 
          src = {urlFor(heroBanner.image)}
          alt = 'headphones'
          className='hero-banner-image'
        />
        <div>
          <Link href = {`/product/${heroBanner.product}`}>
            <button type ='button'>
              {heroBanner.buttonText}
            </button>
          </Link>
          <div className='description'>
            <h5> Description </h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBanner