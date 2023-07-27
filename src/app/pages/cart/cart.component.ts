import { Component, OnInit } from '@angular/core';
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

  constructor(private cartService: CartService){

  }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }

  getTotal(items: Array<CartItem>) : number {
    return this.cartService.getTotal(items);
  }

}
