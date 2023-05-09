import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { OrderItem } from '../models/orderItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new Cart();
  constructor() {}

  getTotalAmount(): number {
    let totalAmount = 0;
    this.cart.items.forEach(
      (item) => (totalAmount += item.price * item.quantity)
    );
    this.cart.totalAmount = totalAmount;
    return totalAmount;
  }

  getCart(): Cart {
    return this.cart;
  }

  updateCart(cart: Cart): void {
    this.cart = cart;
    this.getTotalAmount();
  }

  addProduct(product: Product, quantity: number): void {
    const prod = this.cart.items.find((item) => item.id === product.id);
    if (prod != undefined) {
      prod.quantity = prod.quantity + quantity;
    } else {
      const orderItem = new OrderItem();
      orderItem.id = product.id;
      orderItem.name = product.name;
      orderItem.price = product.price;
      orderItem.description = product.description;
      orderItem.url = product.url;
      orderItem.quantity = quantity;
      this.cart.items.push(orderItem);
    }
    this.getTotalAmount();
  }

  removeProduct(productId: number): void {
    this.cart.items = this.cart.items.filter((item) => item.id != productId);
    this.getTotalAmount();
  }

  updateProductQuantity(productId: number, quantity: number): void {
    const prod = this.cart.items.find((item) => item.id === productId);
    if (prod) {
      prod.quantity = quantity;
    }
    this.getTotalAmount();
  }

  checkout(name: string, address: string, cardNumber: string): Cart {
    this.cart.name = name;
    this.cart.address = address;
    this.cart.cardNumber = cardNumber;
    const finalCart = this.cart;
    this.cart = new Cart();
    return finalCart;
  }
}
