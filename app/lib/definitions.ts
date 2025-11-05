// Type definitions
export type CategoryKey = 'earphones' | 'headphones' | 'speakers';

export type ResponsiveImage = {
  mobile: string;
  tablet: string;
  desktop: string;
};

export type InBoxItem = {
  quantity: number;
  label: string;
};

export type ProductBrief = {
  slug: string;
  name: string;
  image: ResponsiveImage;
};

export type GalleryImages = {
  first: ResponsiveImage;
  second: ResponsiveImage;
  third: ResponsiveImage;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  image: ResponsiveImage;
  category: CategoryKey;
  categoryImage: ResponsiveImage;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: InBoxItem[];
  gallery: GalleryImages;
  others: ProductBrief[];
};

export type ProductsData = {
  data: Product[];
};