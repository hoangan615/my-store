import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  cart: Cart = new Cart();
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    if (this.cart.isConfirmed) {
      this.cartService.clearCart();
    } else {
      this.router.navigate(['my-cart']);
    }
  }
}
