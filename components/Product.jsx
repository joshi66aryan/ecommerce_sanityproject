import React from 'react'
import Link from 'next/link'
import { urlFor } from '../library/client';

const Product = ({product}) => {
  const { image,name,slug, price } = product
  return (
    <div>
      <div>
        <Link href = {`/product/${slug.current}`}>
          <div className='product-card'>
            <img 
              src = {urlFor(image && image[0])} 
              alt ='products'
              width = {250}
              height = {250}
              className = 'product-image' 
            />
            <p className='product-name'>{name}</p>
            <p className='product-price'>${price}</p>

          </div>
        </Link>
      </div>
    </div>
  )
}

export default Product