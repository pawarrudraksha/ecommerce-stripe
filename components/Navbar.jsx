import Link from 'next/link'
import React from 'react'
import  { AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import { Cart } from '.'

const Navbar = () => {
  const {showCart,setShowCart,totalQuantities}=useStateContext()
  return (
    <>
    <div className="navbar-container">
      <p className="logo">
        <Link href={"/"}>Rudra Headphones</Link>
      </p>
      <button type="button" className='cart-icon' onClick={()=>setShowCart(!showCart)}>
        <AiOutlineShopping/>
        <span className="cart-item-qty">
          {totalQuantities}
        </span>
      </button>
    </div>
      {showCart && <Cart/>} 
      </>
  )
}

export default Navbar