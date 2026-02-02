export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: number;
  category_name: string;
  description: string;
  price: string;
  image: string | null;
  stock: number;
  available: boolean;
  weight: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: string;
}

export interface Order {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  total_amount: string;
  items: OrderItem[];
}
