export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  weight: string;
  price: number;
  inStock: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  isPopular: boolean;
  image: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  name: string;
  avatar: string;
  rating: number;
  text: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CategoryItem {
  name: string;
  icon: string;
  bgColor: string;
}
