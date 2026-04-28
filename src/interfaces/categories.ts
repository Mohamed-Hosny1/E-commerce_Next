export interface CategoryI {
  _id: string
  name: string
  slug: string
  image: string
}
export interface CategoryPagePropsI {
  params: { categoryId: string };
}