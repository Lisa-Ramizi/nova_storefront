export type ApiProductReview = {
  rating: number;
};

export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  reviews: ApiProductReview[];
  images: string[];
  brand: string;
  sku: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  stock: number;
};

export type ApiProductsResponse = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};

export type ApiCategory = {
  slug: string;
  name: string;
  url: string;
};

export type ApiCategoriesResponse = ApiCategory[];
