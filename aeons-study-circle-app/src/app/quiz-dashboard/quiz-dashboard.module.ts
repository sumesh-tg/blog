import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizDashboardRoutingModule } from './quiz-dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import {QuizComponent} from './components/quiz/quiz.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent,QuizComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuizDashboardRoutingModule,
  ]
})
export class QuizDashboardModule { }
