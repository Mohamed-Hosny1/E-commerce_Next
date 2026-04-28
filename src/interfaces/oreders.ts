import { ProductI } from "./product"

export interface OrderI {
  shippingAddress: ShippingAddressI
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: UserI
  cartItems: CartItemI[]
  paidAt: string
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface ShippingAddressI {
  details: string
  city: string
  phone: string
}

export interface UserI {
  _id: string
  name: string
  email: string
  phone: string
}
export interface CartItemI {
  count: number
  _id: string
  price: number
  product: ProductI
}