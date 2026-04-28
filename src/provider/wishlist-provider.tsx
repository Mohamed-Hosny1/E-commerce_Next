"use client"
import { getLoggedUserWishList } from '@/actions/wishList.action'
import { WishlistContextI, WishListI } from '@/interfaces/wishlist'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'


export const WishListContext = createContext<WishlistContextI>({
    noOfWishlistItems:0 , 
    handleWishList:()=>{},
    Loading:false,

})
export default function WishListContextProvider({children}:{children:React.ReactNode}) {
    const [noOfWishlistItems, setnoOfWishlistItems] = useState(0)
    const [Loading, setLoading] = useState(false);
 async function handleWishList() {
   try {
    setLoading(true)
     const data:WishListI = await getLoggedUserWishList()
    const total = data.count
    setnoOfWishlistItems(total)
    
    
   } catch (error) {
     toast.error((error as Error).message, { position: "top-center" });
    
   } finally{
    setLoading(false)
   }
   
 }
 useEffect(() => {
   handleWishList()}
   , [])
 
  return (
    <WishListContext.Provider value={{noOfWishlistItems, handleWishList,Loading }}>
{children}
    </WishListContext.Provider>
  )
}
