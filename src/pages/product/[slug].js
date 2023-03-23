import React, { useState } from 'react';
import { client, urlFor } from '../../../library/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from '../../../components/Product'
import { useStateContext } from '../../../context/StateContext'; 

const ProductDetails = ({productData, productsData }) => {

  const { image, name, details, price } = productData
  const [index, setIndex] = useState(0)
  const { increaseQty, decreaseQty, qty, onAdd,setShowCart } = useStateContext() // imported from StateContext

  const handleBuyNow = () => {
    onAdd(productData,qty)
    setShowCart(true)
  }
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              src = {urlFor(image && image[index])}
              className ='product-detail-image'
            />
          </div>
          <div className='small-images-container'>
            { image?.map((item, i) => (
              <img
                key= {i}
                src ={urlFor(item)}
                className = { i === index ? 'small-image selected-image':'small-image'}
                onMouseEnter = {() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>

            <h1>{name}</h1>
            <div className='reviews'>
              <div>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiOutlineStar/>
              </div>
              <p> (20) </p>
            </div>

            <h4> Details: </h4>
            <p>{details}</p>
            <p className='price'>${price}</p>

            <div className='quantity'>

              <h3> Quantity: </h3>
              <p className='quantity-desc'>
                <span className='minus' onClick= {decreaseQty}>
                  <AiOutlineMinus/>
                </span>
                <span className='num' >
                  {qty}
                </span>
                <span className='plus' onClick= {increaseQty}>
                  <AiOutlinePlus/>
                </span>
              </p>

            </div>
            <div className='buttons'>

              <button 
                type='button'
                className='add-to-cart'
                onClick= {() => onAdd(productData,qty)}
              >
                Add to Cart
              </button>

              <button 
                type='button'
                className='buy-now'
                onClick= {handleBuyNow}
              >
                Buy Now
              </button>

            </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
            <h2> You may also like</h2>
            <div className='marquee'>
              <div className='maylike-products-container track'>
                { productsData.map((item) => (
                  <Product key={item._id} product= {item}/>
                ))}
              </div>
            </div>
      </div>
    </div>
  )
}
export const getStaticPaths = async () => { //specify dynamic routes that should be pre-rendered at build time using 
  const query = `*[_type == "product"] { 
    slug {
      current
    }
  }`
  const products = await client.fetch(query)
  const paths = products.map((product) => ({ // returning object ({})
    params:{
      slug: product.slug.current
    }
  }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({params:{slug}}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery ='*[_type == "product"]'

  const productData = await client.fetch(query);
  const productsData = await client.fetch(productsQuery);

  return {
    props: { productsData, productData }
  }
}


export default ProductDetails