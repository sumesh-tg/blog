import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { QuizInsertComponent } from './components/quiz-insert/quiz-insert.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { TestConfigComponent } from './components/test-config/test-config.component';
import { QuizDashboardRoutingModule } from './quiz-dashboard-routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    QuizDashboardRoutingModule,
    QuizInsertComponent,
    TestConfigComponent,
    QuizComponent,
    HomeComponent
  ]
})
export class QuizDashboardModule { }
