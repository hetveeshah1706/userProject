import { Component, OnInit } from '@angular/core';
import { OrderDataService } from '../checkout/order-data.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderArr:any=[];
  fk_user_email:string;
  fk_customer_id:number;
  customer_name:string;
  constructor(public _orderData:OrderDataService) { }

  ngOnInit(): void {
    this.fk_user_email=localStorage.getItem('user_email')
    this._orderData.getCustomerByEmail(this.fk_user_email).subscribe(
      (data)=>{
        this.fk_customer_id=data[0].customer_id
        this.customer_name=data[0].customer_name
        this._orderData.getOrderDetailsOfCustomer(this.fk_customer_id).subscribe(
          (data)=>{
            this.orderArr=data;
            console.log(this.orderArr)
          }
        );
      }
    );

  }

}
