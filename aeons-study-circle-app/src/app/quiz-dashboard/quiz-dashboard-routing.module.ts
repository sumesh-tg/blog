import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizInsertComponent } from './components/quiz-insert/quiz-insert.component';
import { TestConfigComponent } from './components/test-config/test-config.component';


const routes: Routes = [{path:"quiz",component:HomeComponent,
children:[
  {
    path:'',
    redirectTo:"/quiz/home",
    pathMatch:"full"
  },
  {
    path:"home",
    component:QuizComponent
  },
  {
    path:"insert",
    component:QuizInsertComponent
  },
  {
    path:"config",
    component:TestConfigComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizDashboardRoutingModule { }
