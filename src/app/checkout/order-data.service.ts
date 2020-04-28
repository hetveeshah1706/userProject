import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { addToCart } from '../check-out/checkout_class';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  public customer_url:string="http://localhost:3000/userGetCustomer/";
  public order_url:string="http://localhost:3000/order/";
  public order_delivery_url:string="http://localhost:3000/userOrderDelivery/"
  url:string="http://localhost:3000/userOrderDeliveryGet/";
  public order_details:string="http://localhost:3000/userOrderDetails/";
  constructor(public _http:HttpClient) { }
  getCustomerByEmail(fk_user_email){
    return this._http.get(this.customer_url+fk_user_email)
  }
  orderAdd(item){
    console.log(item);
    return this._http.post(this.order_url,item);
  }

  orderdetailAdd(item){
    console.log(item);
    return this._http.post(this.order_delivery_url,item);
  }
  getOrdersByDate(order_date){
    let obj = {
      "date" :  order_date
    };
    let body = JSON.stringify(obj);
    let head = new HttpHeaders().set('Content-Type', "application/json");
    return this._http.post(this.url,body ,{headers: head});
  }
  getOrderDetailsOfCustomer(id){
    return this._http.get(this.order_details+id);
  }
}
