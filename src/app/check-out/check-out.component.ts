import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart_class';
import { cartDetail } from '../cart_details';
import { CartDataService } from '../cart/cart-data.service';
import { OrderDataService } from '../checkout/order-data.service';
import { addToCart } from './addToCart_class';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart:Cart=JSON.parse(localStorage.getItem('cart'));
  arrcartItem:cartDetail[]=[];
  GrandTotal:number=0;
  fk_user_email:string="";
  fk_customer_id:number=0;
  comment:string="";
  orderArr:any=[];
  getMonth:number;
  constructor(private _cartservice:CartDataService,public _orderService:OrderDataService) { }

  ngOnInit(): void {
    console.log(this.cart);
    if (this.cart!=null){
      if(this.cart.CartItems.length>=0){
        this.arrcartItem = this.cart.CartItems;
      }
      this.GrandTotal=this.cart.GrandTotal;
    }
    this.fk_user_email=localStorage.getItem('user_email')
    this._orderService.getCustomerByEmail(this.fk_user_email).subscribe(
      (data)=>{
        this.fk_customer_id=data[0].customer_id
      }
    );
  }
  onPlaceOrder(){
      let fk_customer_id=this.fk_customer_id;
      let order_status="pending";
      let order_date =new Date();
      this.getMonth=order_date.getMonth()+1;
      // let dateStr = order_date.getDate() + "/"+ this.getMonth + "/" + order_date.getFullYear();
      let dateStr = order_date.getFullYear() + "-" + this.getMonth + "-" + order_date.getDate();

      console.log(dateStr);
    let orderObj=new addToCart(this.arrcartItem,dateStr,fk_customer_id,order_status)
   console.log(orderObj)



    this._orderService.orderAdd(orderObj).subscribe(
      (x:any)=>{
         console.log(x)
        // this.orderArr.push(x);
  //       // console.log("Data Added Successfully")
  //       // console.log(this.orderArr)
  //       // // for(let i=0;i<this.orderArr.length;i++){
  //       //   let obj={
  //       //     comment:this.comment,
  //       //     fk_order_id : x.insertId
  //       //   }
  //       //   console.log(obj)
  //       //   this._orderService.orderdetailAdd(obj).subscribe(
  //       //     (y:any)=>{
  //       //       console.log(y)
  //       //       alert("added")
  //       //     }
  //       //   );
  //       // }

      },(err) => {},
      () => {
        this._orderService.getOrdersByDate(dateStr).subscribe(
          (data:any[])=>{
            console.log(data);
            for(let i=0;i<data.length;i++){
              let obj={
                          comment:this.comment,
                          fk_order_id : data[i].order_id
                        }
              this._orderService.orderdetailAdd(obj).subscribe(

                (y:any)=>{
                  console.log(y)
                }
              );

            }

          }
        );
       }
   );


  }

}
