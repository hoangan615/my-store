import { Injectable, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { OrderItem } from '../models/orderItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new Cart();
  constructor() {
    const json = localStorage.getItem('cart') || '{}';
    if (json != '{}') {
      this.cart = JSON.parse(json);
    }
  }

  saveToLocal() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

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
    this.saveToLocal();
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
    this.saveToLocal();
  }

  checkout(name: string, address: string, cardNumber: string): Cart {
    this.cart.name = name;
    this.cart.address = address;
    this.cart.cardNumber = cardNumber;
    this.cart.isConfirmed = true;
    const finalCart = this.cart;
    return finalCart;
  }

  clearCart() {
    this.cart = new Cart();
    this.saveToLocal();
  }
}
