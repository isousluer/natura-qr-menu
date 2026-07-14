export interface Category {
  id: string
  name: string
  image_url: string | null
  sort_order: number
  is_active: boolean
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  sort_order: number
  is_active: boolean
}

export interface CategoryWithItems extends Category {
  menu_items: MenuItem[]
}
