import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizConfigService } from '../../services/quiz-config.service';
import { QuizConfig } from '../../models';

@Component({
  selector: 'app-test-config',
  templateUrl: './test-config.component.html',
  styleUrls: ['./test-config.component.scss']
})
export class TestConfigComponent {
  
  @Input() config: any = {
    id: '',
    name: '',
    description: '',
    autoMove: false,
    shuffleQuestions: false,
    allowBack: true,
    theme: 'default'
  };

  @Output() configChange = new EventEmitter<any>();
  
  public quizConfigModel: QuizConfig = new QuizConfig({
    id: '', // or VendorUtils.makeRandom(8) if you want random id
    name: '',
    description: '',
    allowBack: true,
    allowReview: true,
    autoMove: false,
    duration: 0,
    pageSize: 1,
    requiredAll: false,
    shuffleQuestions: false,
    shuffleOptions: false,
    showClock: false,
    showPager: true,
    theme: 'default'
  });

  constructor(private quizConfigService: QuizConfigService) {}

  save() {
    const quizConfigModel = new QuizConfig(this.config);
    this.quizConfigModel.allowBack = quizConfigModel.allowBack;
    this.quizConfigModel.name = quizConfigModel.name;
    this.quizConfigService.getTestConfigById(123).subscribe(data => {
        console.log("check by id", data);
    });
    this.quizConfigService.createTestConfig(this.quizConfigModel)
      .then(() => {
        console.log('Test configuration saved successfully!');
      })
      .catch((err) => {
        console.log('Error saving test configuration: ' + err);
      });
  }

  emitChange() {
    this.configChange.emit(this.config);
  }
  onDeleteConfig() {
    // Implement your delete logic here, e.g., clear config or emit an event
    this.config = {
      id: '',
      name: '',
      description: '',
      autoMove: false,
      shuffleQuestions: false
    };
    this.emitChange();
  }
  onEditConfig() {
    // Implement your edit logic here, e.g., open a modal or enable editing mode
    alert('Edit action triggered!');
  }
  resetConfig() {
    this.config = {
      id: '',
      name: '',
      description: '',
      autoMove: false,
      shuffleQuestions: false
    };
    this.emitChange();
  }
  onExportConfig() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "test-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}