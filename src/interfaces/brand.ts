export interface BrandI {
  _id: string
  name: string
  slug: string
  image: string
}
export interface BrandPagePropsI {
  params: { brandId: string };
}