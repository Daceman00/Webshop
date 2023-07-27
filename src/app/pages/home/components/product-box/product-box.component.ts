import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id:1,
    title:'Snickers',
    price:100,
    category:'Shoes',
    description:'Description',
    image:'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
  }
  @Output() addToCart = new EventEmitter();
  
  constructor(){

  }

  ngOnInit(): void {
    
  }

  onAddToCart():void {
    this.addToCart.emit(this.product);
  }

}
