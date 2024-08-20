export interface TOrder {
  player: string,
  coupon: string,
  email: string,
  items: {
    id: number,
    a: number
  }[]
}

export interface TCartItem {
  id: number,
  amount: number
}

export interface TTableQuery {
  q?: string, // query
  s?: string, // sort
  d?: string, // direction
  page: number
}

export interface TItem {
  id: number,
  image: string,
  image2: string,
  name: string,
  subtitle: string,
  description: string,
  price: number
}

export interface TItemCategory {
  id: number,
  name: string,
  items: TItem[]
}

export interface TShopResponse {
  shops: TShop[],
  last_page: number
}

export interface TShop {
  id: number,
  display_name: string,
  lore: string[],
  enchantments: string[],
  stock: number,
  price: number,
  owner: string,
  x: number,
  y: number,
  z: number,
  created_at: number,
  type: number
}

export interface TBan {
  id: number,
  date: number,
  victim: string,
  operator: string,
  date_to: number,
  reason: string
}
