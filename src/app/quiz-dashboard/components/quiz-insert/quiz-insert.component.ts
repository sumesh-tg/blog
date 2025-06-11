import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-insert',
  templateUrl: './quiz-insert.component.html',
  styleUrls: ['./quiz-insert.component.css'],
  imports: [FormsModule,CommonModule],
  // standalone : true
})
export class QuizInsertComponent {
  quizData: any = {
    id: null,
    name: '',
    questions: []
  };

  quizNames: string[] = [
    'JavaScript Quiz',
    'Asp.Net Quiz',
    'C Sharp Quiz',
    'Design Patterns Quiz'
  ];

  addQuestion() {
    this.quizData.questions.push({
      id: Date.now(),
      name: '',
      questionTypeId: 1,
      options: [
        { id: Date.now() + 1, name: '', isAnswer: false },
        { id: Date.now() + 2, name: '', isAnswer: false },
        { id: Date.now() + 3, name: '', isAnswer: false },
        { id: Date.now() + 4, name: '', isAnswer: false }
      ],
      questionType: { id: 1, name: 'Multiple Choice', isActive: true }
    });
  }

  addOption(question: any) {
    question.options.push({ id: Date.now(), name: '', isAnswer: false });
  }

  getAnswerString(question: any): string {
    return question.options
      .filter((option: any) => option.isAnswer)
      .map((option: any) => option.name)
      .join(', ');
  }

  setCorrectOption(question: any, oIdx: number) {
    question.options.forEach((option: any, idx: number) => {
      option.isAnswer = idx === oIdx;
    });
  }

  saveQuiz() {
    // Here you can send quizData to your backend or service
    console.log('Quiz saved:', this.quizData);
    alert('Quiz saved! Check console for data.');
  }
}