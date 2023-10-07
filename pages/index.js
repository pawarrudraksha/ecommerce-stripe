import React from 'react'
import { Product,FooterBanner,HeroBanner } from '../components'
import { client } from '../lib/client'

function Home({products,bannerData}){
    return(
        <>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
        <div className='products-heading'> 
            <h2>Best selling products</h2>
            <p>Speakers of many variations</p>
        </div>
        <div className='products-container' style={{display:"flex" ,justifyContent:'space-around'}}>
            {
                products?.map((product)=>{
                    return(
                        <Product key={product?._id} product={product}/>
                    )
                })
            }
        </div>
        <FooterBanner footerBanner={bannerData && bannerData[0]}/>
        </>
        
    )
}
export const getServerSideProps=async ()=>{
    const query='*[_type=="product"]'
    const products=await client.fetch(query)
     
    const bannerQuery='*[_type=="banner"]'
    const bannerData=await client.fetch(bannerQuery)

    return{
        props:{products,bannerData}
    }
}
export default Home