export interface Category {
  id: string
  name: string
  image_url: string | null
  display_order: number
  is_active: boolean
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string
  price: string
  image_url: string | null
  display_order: number
  is_active: boolean
}

export interface CategoryWithItems extends Category {
  items: MenuItem[]
}
