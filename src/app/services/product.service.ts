import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import ProductData from '../../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];

  constructor() {
    this.products = ProductData;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
