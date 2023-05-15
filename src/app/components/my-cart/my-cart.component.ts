import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  myCart: Cart = new Cart();
  cusName: string = '';
  cusAddress: string = '';
  creditCardNumber: string = '';

  constructor(
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.myCart = this.cartService.getCart();
  }

  onChange(id: number, quantity: number): void {
    this.myCart.items = this.myCart.items.filter((item) => item.quantity > 0);
    if (quantity == 0) {
      alert('Removed the product');
    }
    this.cartService.updateCart(this.myCart);
  }

  submit() {
    this.cartService.checkout(
      this.cusName,
      this.cusAddress,
      this.creditCardNumber
    );
    this.router.navigate(['confirmation']);
  }
}
