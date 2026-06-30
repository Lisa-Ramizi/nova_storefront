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
  images?: string[];
  brand?: string;
  sku?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  stock?: number;
};

export type ProductsResult = {
  products: Product[];
  total: number;
};

export type ProductCardProps = Omit<Product, "id"> & {
  inCart?: boolean;
  onAddToCart?: () => void;
  onWishlistClick?: () => void;
};
