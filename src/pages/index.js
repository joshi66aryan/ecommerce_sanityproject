import React from 'react';
import { client } from '../../library/client';
import { Product, FooterBanner, MainBanner} from '../../components';
import banner from '../../sanity_ecommerce/schemas/banner';

const Home = ({productsData, bannerData}) => { // get data from getServerSideProps return
  return (
    <>
      <MainBanner heroBanner = {bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h2> Best Selling Products </h2>
        <p> Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {productsData?.map(
          (item) => <Product key = {item._id} product = {item} />
        )}
      </div>

      <FooterBanner footerBanner ={bannerData && bannerData[0] }/>
    </>
  )
}
export const getServerSideProps = async () => {  //next.js way to use useEffect to fetch the data from sanity
  const query = '*[_type == "product"]'
  const productsData = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { productsData, bannerData }
  }
}

export default Home