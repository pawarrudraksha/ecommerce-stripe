import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'
import { BsCurrencyRupee } from 'react-icons/bs'

const Product = ({product:{image,name,slug,price}}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image && image[0])} alt="product image" width={250} height={250} className='product-image' />
        </div>
        <p className="product-name">{name}</p>
        <p className="product-price"><BsCurrencyRupee style={{position:"relative",top:"3px"}}/>{price} </p>
      </Link>
    </div>
  )
}

export default Product