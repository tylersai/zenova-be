import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  imageUrl: string;
  rating: number;
  stock: number;
  quantity: number;
}

export class Address {
  line1: string;
  line2?: string;
  city: string;
  province: string;
  country: string = 'Thailand';
  postalCode: string;
}

export class CreateOrderPayload {
  cartItems: CartItem[];
  subTotal: number;
  shippingFee: number;
  discount: number;
  totalPayment: number;
  userId?: string;
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  address: Address;
  paymentMethod?: 'card' | 'cod' | 'banking';
  status: 'unpaid' | 'paid' = 'unpaid';
}
