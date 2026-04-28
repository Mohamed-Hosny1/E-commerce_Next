"use client"
import { getLoggedUserCart } from '@/actions/cart.action'
import { CartContextI, CartI } from '@/interfaces/cart'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'


export const cartContext = createContext<CartContextI>({
    noOfCartItems:0 , 
    handleCart:()=>{},
    isLoading:false,
    totalPrice:0
})
export default function CartContextProvider({children}:{children:React.ReactNode}) {
    const [noOfCartItems, setNoOfCartItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [isLoading, setisLoading] = useState(false);
 async function handleCart() {
   try {
    setisLoading(true)
     const data:CartI = await getLoggedUserCart()
    const total = data.data.products.reduce((accu , prod)=> prod.count + accu , 0)
    const totalPrice = data.data.totalCartPrice
    setNoOfCartItems(total)
    setTotalPrice(totalPrice)
    
   } catch (error) {
    toast.error((error as Error).message, { position: "top-center" });
    
   } finally{
    setisLoading(false)
   }
   
 }
 useEffect(() => {
   handleCart()}
   , [])
 
  return (
    <cartContext.Provider value={{noOfCartItems, handleCart,isLoading , totalPrice}}>
{children}
    </cartContext.Provider>
  )
}
