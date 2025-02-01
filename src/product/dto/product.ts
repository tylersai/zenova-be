export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  isNewlyAdded: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
