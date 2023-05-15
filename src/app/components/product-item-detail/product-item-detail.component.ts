import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  product: Product = new Product();
  quantity: number = 1;
  options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = parseInt(params['id']);
      this.productService.getProducts().subscribe((res) => {
        this.product = res.find((t) => t.id == id) || new Product();
        console.log(params, id, this.product);
      });
    });
  }

  addToCart() {
    console.log('quantity: ', this.quantity);
    this.cartService.addProduct(this.product, this.quantity);
    alert('Added to cart');
  }
}
