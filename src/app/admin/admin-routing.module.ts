import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AddQuestionsComponent } from './components/forms/add-questions/add-questions.component';


const routes: Routes = [{
  path:"admin",component:AdminHomeComponent,children:[
    {path:"",redirectTo:"/admin/home",pathMatch:"full"},
    {path:"home",component:AddQuestionsComponent},
    {path:"add-questions",component:AddQuestionsComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
