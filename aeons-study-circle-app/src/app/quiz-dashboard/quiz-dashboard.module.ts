import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizDashboardRoutingModule } from './quiz-dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import {QuizComponent} from './components/quiz/quiz.component'
import { FormsModule } from '@angular/forms';
import { QuizInsertComponent } from './components/quiz-insert/quiz-insert.component';
import { TestConfigComponent } from './components/test-config/test-config.component';

@NgModule({
  declarations: [HomeComponent,QuizComponent, QuizInsertComponent, TestConfigComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuizDashboardRoutingModule,
  ]
})
export class QuizDashboardModule { }
