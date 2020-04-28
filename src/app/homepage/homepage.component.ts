import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from './product-service.service';
import { product_class } from './product_class';
import { Router } from '@angular/router';
import { cartDetail } from '../cart_details';
import { CartDataService } from '../cart/cart-data.service';
import { Cart } from '../cart_class';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cartProductItem:product_class=null;
  currentCartItem:cartDetail=null;

  SubTotal:number=0;
  GrandTotal:number=0;

  constructor(private _data: ProductServiceService,public _route:Router,private _cartService:CartDataService) { }
  pro_arr: product_class[] = [];
  ngOnInit() {
    this._data.getAllproduct().subscribe(
      (data: product_class[]) => {
        console.log(data);
        this.pro_arr = data;
        console.log(this.pro_arr);
      }
    );
   }
   onAdd(item:product_class)
   {
     this._route.navigate(['/singleproduct',item.pro_id]);
   }
   onAddToCart(item:product_class){
    this.cartProductItem=item;
    this.SubTotal=this._cartService.doSubTotal(this.cartProductItem.pro_price,1);
    this.currentCartItem=new cartDetail(this.cartProductItem,1,this.SubTotal);

    if (localStorage.getItem('cart')==null){
      const cartItems:cartDetail[] = [];
      cartItems.push(this.currentCartItem);
      this.GrandTotal=this._cartService.doGrandTotal(cartItems);

      const mycart=new Cart(cartItems,this.GrandTotal);

      localStorage.setItem('cart',JSON.stringify(mycart));
    }
    else{
      const cart:Cart=JSON.parse(localStorage.getItem('cart')) as Cart;
      let index:number = -1;

      //getting index of product
      if (cart.CartItems.length>=0){
        index=cart.CartItems.map(function(x){
          return x.productItem.pro_id;
        }).indexOf(item.pro_id);

      // if current product does not exist in cart then add it
      if (index==-1){
        cart.CartItems.push(this.currentCartItem);
        cart.GrandTotal=this._cartService.doGrandTotal(cart.CartItems);

        localStorage.setItem('cart',JSON.stringify(cart));
      }

        else{
          const cartItem:cartDetail=cart.CartItems[index];
          cartItem.qty+=1;
          cartItem.SubTotal=this._cartService.doSubTotal(this.cartProductItem.pro_price,cartItem.qty);

          cart.CartItems[index]=cartItem;
          cart.GrandTotal=this._cartService.doGrandTotal(cart.CartItems);

          localStorage.setItem('cart',JSON.stringify(cart));
        }
      }
      alert("Successfully Addded to cart");
      //this._router.navigate(['/cart']);
    }
  }
  onClick(){
    this._route.navigate(['/viewOrderDetails']);
  }

  }
