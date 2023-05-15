# MyStore

## Setup Project

### 1. Run `npm install` to install package dependencies

### 2. Run `ng serve` to run project

    Project will run on port 4200. Link: localhost:4200

## Project Information

## 1. Routings

```ts
{
    path: '',           // <== Home page (Product list)
    component: ProductListComponent,
  },
  {
    path: 'products',   // <== Product list
    component: ProductListComponent,
  },
  {
    path: 'products/:id',   // <== Product detail with id
    component: ProductItemDetailComponent,
  },
  {
    path: 'confirmation',   // <== Confirm successful checkout
    component: ConfirmationComponent,
  },
  {
    path: 'my-cart',        // <== My Cart detail
    component: MyCartComponent,
  },
  { path: '**', redirectTo: '/' },
```

## 2. Components

- ProductListComponent (`app/components/product-list`): display the list of products
- ProductItemDetailComponent (`app/components/product-item-detail`): display the detail of a product
- MyCartComponent (`app/components/my-cart`): display the current cart information & checkout
- ConfirmationComponent (`app/components/confirmation`): confirm successful checkout
- ProductItemComponent (`app/components/product-item`): display a product item information in the product list

## 3. Models

- Product Model includes id, name, price, url (image url) and description.

  ```tsx
  export class Product {
    id: number = 0;
    name: string = "";
    price: number = 0;
    url: string = "";
    description: string = "";
  }
  ```

- OrderItem Model includes id, name, price, url (image url), description and quantity.

  ```tsx
  export class OrderItem {
    id: number = 0;
    name: string = "";
    price: number = 0;
    url: string = "";
    description: string = "";
    quantity: number = 1;
  }
  ```

- Cart Model includes order items, customer name, customer address, customer credit cart number, total amount of order and order status.

  ```tsx
  export class Cart {
    items: OrderItem[] = [];
    name: string = "";
    address: string = "";
    cardNumber: string = "";
    totalAmount: number = 0;
    isConfirmed: boolean = false;
  }
  ```

## 4. Services

- `ProductService`: get product information.
  - `getProducts()`: return a list of product.
- `CartService`: manage a cart information.
  - `getCart()`: return the current cart information.
  - `updateCart(cart: Cart)`: update the new cart information
  - `addProduct(product: Product, quantity: number)`: add the product into the cart with quantity
  - `checkout(name: string, address: string, cardNumber: string)`: check out the cart with customer information: name, address, cardNumber
