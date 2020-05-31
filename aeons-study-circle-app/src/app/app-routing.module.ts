import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddVendorComponent } from './components/dashboard/forms/add-vendor/add-vendor.component';
import { BlogListComponent } from './components/dashboard/body/blog-list/blog-list.component';
import { AddPostComponent } from './components/dashboard/forms/add-post/add-post.component';
import { BlogPostComponent } from './components/dashboard/body/blog-post/blog-post.component';
import { HomePageComponent } from './components/dashboard/body/home-page/home-page.component';
import { ContactUsComponent } from './components/dashboard/body/contact-us/contact-us.component';
import { DeletePostComponent } from './components/dashboard/forms/delete-post/delete-post.component';


const routes: Routes = [
  {path:"",redirectTo:"/dashboard/blog",pathMatch:"full"},
  {path:"dashboard" , component :DashboardComponent,children:[
    {path:"",redirectTo:"/dashboard/blog",pathMatch:"full"},
    {path:'blog',component:BlogListComponent},
    {path:'home',component:HomePageComponent},
    {path:'contact-us',component:ContactUsComponent},
    {path:'add-vendor',component:AddVendorComponent},
    {path:'add-post',component:AddPostComponent},
    {path:'blog-post',component:BlogPostComponent},
    {path:'delete-post',component:DeletePostComponent},
    {path:'**',component:BlogListComponent}
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents=[{LoginComponent,DashboardComponent}];
