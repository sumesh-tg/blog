import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorListComponent } from './components/dashboard/body/vendor-list/vendor-list.component';
import { FeaturesListComponent } from './components/dashboard/body/features-list/features-list.component';
import { PlanListComponent } from './components/dashboard/body/plan-list/plan-list.component';
import { AddVendorComponent } from './components/dashboard/forms/add-vendor/add-vendor.component';


const routes: Routes = [
  {path:"" , component :LoginComponent},
  {path:"dashboard" , component :DashboardComponent,children:[
    {path:"",redirectTo:"/dashboard/home",pathMatch:"full"},
    {path:'home',component:VendorListComponent},
    {path:'features',component:FeaturesListComponent},
    {path:'plan',component:PlanListComponent},
    {path:'add-vendor',component:AddVendorComponent},
    {path:'**',component:VendorListComponent}
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents=[{LoginComponent,DashboardComponent}];
