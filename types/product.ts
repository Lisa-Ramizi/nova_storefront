export type Product = {
  id: string;
  image?: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
};

export type ProductCardProps = {
  image?: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  inCart?: boolean;
  onAddToCart?: () => void;
  onWishlistClick?: () => void;
};
