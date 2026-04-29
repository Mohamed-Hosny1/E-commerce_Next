import { BrandI } from "./brand"
import { CategoryI } from "./categories"
import { SubcategoryI } from "./subcategories"

export interface WishListI {
  status: string
  count: number
  data: WishListDataI[]
}

export interface WishListDataI {
  sold: number
  images: string[]
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface WishlistContextI {
  noOfWishlistItems: number
  wishlistedIds: string[]       
  handleWishList(): void
  Loading: boolean
}