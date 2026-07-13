export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface ProductVariant {
  id: string;
  label: string;
  swatch?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  sku: string;
  tags: string[];
  variants?: ProductVariant[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
  shipping: {
    estimate: string;
    freeOver: number;
  };
}
