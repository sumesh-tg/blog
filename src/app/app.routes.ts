import { Routes } from '@angular/router';


import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BlogListComponent } from './component/dashboard/body/blog-list/blog-list.component';
import { HomePageComponent } from './component/dashboard/body/home-page/home-page.component';
import { ContactUsComponent } from './component/dashboard/body/contact-us/contact-us.component';
import { AddPostComponent } from './component/dashboard/forms/add-post/add-post.component';
import { BlogPostComponent } from './component/dashboard/body/blog-post/blog-post.component';
import { DeletePostComponent } from './component/dashboard/forms/delete-post/delete-post.component';

export const routes: Routes = [
   {path:"",redirectTo:"/dashboard/blog",pathMatch:"full"},
  {path:"dashboard" , component :DashboardComponent,children:[
    {path:"",redirectTo:"/dashboard/blog",pathMatch:"full"},
    {path:'blog',component:BlogListComponent},
    {path:'home',component:HomePageComponent},
    {path:'contact-us',component:ContactUsComponent},
    // {path:'add-vendor',component:AddVendorComponent},
    {path:'add-post',component:AddPostComponent},
    {path:'blog-post',component:BlogPostComponent},
    {path:'delete-post',component:DeletePostComponent},
    {path:'preview',component:BlogPostComponent},
    {path:'**',component:BlogListComponent}
  ]} 
];
