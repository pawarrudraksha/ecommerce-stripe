import React, { createContext, useContext, useState } from "react"
import toast from "react-hot-toast"

const Context=createContext()

export const StateContext=({children})=>{
    const [showCart,setShowCart]=useState(false)
    const [cartItems,setCartItems]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    const [totalQuantities,setTotalQuantities]=useState(0)
    const [qty,setQty]=useState(1);
    const incQty=()=>{
        setQty((state)=>state +1)
    }
    const decQty=()=>{
        setQty((state)=>{
            if(state-1<1){
                return 1
            }
            return state -1
        })
    }

    let foundProduct,index;

    const toggleCartItemQuantity=(id,value)=>{
        foundProduct=cartItems.find((item)=>item._id===id)
        index=cartItems.findIndex((item)=>item._id==id)
        const newCartItems=cartItems.filter((item)=>{
            return(
                item._id!==id
            )
        })
        if(value==="inc"){
            setCartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity+1}])
            setTotalQuantities((state)=>state+1)
            setTotalPrice((state)=>state + foundProduct.price)
        }else if(value==="dec"){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity-1}])
                setTotalQuantities((state)=>state-1)
                setTotalPrice((state)=>state - foundProduct.price)
            }
        }
    }


    const onAdd=(product,quantity)=>{
        const checkProductInCart=cartItems.find((item)=>item._id ===product._id)
        setTotalPrice((state)=>(state + (product.price*quantity)))
        setTotalQuantities((state)=> state + quantity)
        if(checkProductInCart){
            const updatedCartItems=cartItems.map((item)=>{
                if(item._id===product._id){
                    return{
                        ...item,quantity:item.quantity+quantity
                    }
                }
            })

            setCartItems(updatedCartItems)
        }
        else{
            product.quantity=quantity
            setCartItems([...cartItems,{...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

    const onRemove=(id)=>{
        foundProduct=cartItems.find((product)=>product._id===id)
        const newCartItems=cartItems.filter((item)=>{
            return(
                item._id!==id
            )
        })
        setTotalPrice((state)=>state- foundProduct.price*foundProduct.quantity)
        setTotalQuantities((state)=>state-foundProduct.quantity)
        setCartItems(newCartItems)
    }
    return(
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            showCart,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalQuantities,
            setTotalPrice
        }}>
            {children}
        </Context.Provider>
    )

}

export const useStateContext=()=>useContext(Context)