import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart = { items: [{
    id:1,
    product: "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
    name: 'Shoes',
    price: 250,
    quantity: 1,
  },
  {
    id:2,
    product: "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
    name: 'Shoes',
    price: 450,
    quantity: 2,
  },
  {
    id:3,
    product: "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
    name: 'Shoes',
    price: 100,
    quantity: 5,
  }]};

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private cartService: CartService, private http: HttpClient){

  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
    this.cart = _cart;
    this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>) : number {
    return this.cartService.getTotal(items);
  }

  onCleanCart(): void{
    this.cartService.clearCart();
  }

  onRemoveItem(item: CartItem): void{
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void{
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void{
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout',{
      items: this.cart.items
    }).subscribe(async (res: any)=> {
      let stripe = await loadStripe('sk_test_51NYpWcDQYXmxwuNkdVTcFsHC25iQGOH6gxiyBaKGwJFapSdvFqOKbvHEXANQPDZzowhRCqgojROR1zv2eJUT8HNP00XMRYY4cv');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
