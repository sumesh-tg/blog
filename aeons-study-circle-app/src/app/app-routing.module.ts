import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorListComponent } from './components/dashboard/body/vendor-list/vendor-list.component';
import { FeaturesListComponent } from './components/dashboard/body/features-list/features-list.component';
import { PlanListComponent } from './components/dashboard/body/plan-list/plan-list.component';
import { AddVendorComponent } from './components/dashboard/forms/add-vendor/add-vendor.component';
import { BlogListComponent } from './components/dashboard/body/blog-list/blog-list.component';
import { AddPostComponent } from './components/dashboard/forms/add-post/add-post.component';
import { BlogPostComponent } from './components/dashboard/body/blog-post/blog-post.component';


const routes: Routes = [
  {path:"",redirectTo:"/dashboard/blog",pathMatch:"full"},
  {path:"dashboard" , component :DashboardComponent,children:[
    {path:"",redirectTo:"/dashboard/blog",pathMatch:"full"},
    {path:'blog',component:BlogListComponent},
    {path:'features',component:FeaturesListComponent},
    {path:'plan',component:PlanListComponent},
    {path:'add-vendor',component:AddVendorComponent},
    {path:'add-post',component:AddPostComponent},
    {path:'blog-post',component:BlogPostComponent},
    {path:'**',component:BlogListComponent}
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents=[{LoginComponent,DashboardComponent}];
