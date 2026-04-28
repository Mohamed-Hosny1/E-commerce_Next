import { ProductI } from "./product"

export interface CartI {
  status: string
  numOfCartItems: number
  cartId: string
  data: CartDataI
}

export interface CartDataI {
  _id: string
  cartOwner: string
  products: CartProductI[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartProductI {
  count: number
  _id: string
  product: ProductI
  price: number
}
export interface CartContextI {
  noOfCartItems:number
  handleCart():void
  isLoading:boolean
  totalPrice:number
}
