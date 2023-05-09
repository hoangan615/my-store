import { OrderItem } from './orderItem';

export class Cart {
  items: OrderItem[] = [];
  name: string = '';
  address: string = '';
  cardNumber: string = '';
  totalAmount?: number;
}
