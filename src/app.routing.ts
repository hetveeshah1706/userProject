
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './app/homepage/homepage.component';
import { LoginComponent } from './app/login/login.component';
import { SingleproductComponent } from './app/singleproduct/singleproduct.component';
import { CartComponent } from './app/cart/cart.component';
import { CheckOutComponent } from './app/check-out/check-out.component';
import { BlogComponent } from './app/blog/blog.component';
import { FAQComponent } from './app/faq/faq.component';
import { ContactComponent } from './app/contact/contact.component';
import { OrderDetailsComponent } from './app/order-details/order-details.component';



const arr: Routes = [
  { path: '', component: HomepageComponent },
  {path:'home',component:HomepageComponent},
  { path: 'login', component: LoginComponent },
  { path:'cart', component:CartComponent},
  {path:'checkout',component:CheckOutComponent},
  {path:'blog',component:BlogComponent},
  {path:'faq',component:FAQComponent},
  {path:'contact',component:ContactComponent},
  {path:'singleproduct/:pro_id',component:SingleproductComponent},
  {path:'viewOrderDetails',component:OrderDetailsComponent}



];
export const arr_routing = RouterModule.forRoot(arr);
