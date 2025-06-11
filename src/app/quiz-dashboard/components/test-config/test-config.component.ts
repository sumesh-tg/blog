import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizConfigService } from '../../services/quiz-config.service';
import { QuizConfig } from '../../models';
import { FormsModule } from '@angular/forms';
import { VendorUtils } from 'app/shared/util/VendorUtils';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@Component({
  selector: 'app-test-config',
  templateUrl: './test-config.component.html',
  styleUrls: ['./test-config.component.scss'],
  imports: [FormsModule,CommonModule,BsDropdownModule],
  // standalone: true
})
export class TestConfigComponent {

  @Input() config: any = {
    id: 'TST_' + VendorUtils.makeRandom(8),
    name: '',
    description: '',
    autoMove: false,
    shuffleQuestions: false,
    allowBack: true,
    theme: 'default'
  };

  @Output() configChange = new EventEmitter<any>();

  public quizConfigModel: QuizConfig = new QuizConfig({
    id: 'QST_' + VendorUtils.makeRandom(8),
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

  testConfigs: any[] = [];

  constructor(private quizConfigService: QuizConfigService) { }

  ngOnInit(): void {
    this.quizConfigService.getAllTestConfigs().subscribe((configs: any[]) => {
      this.testConfigs = configs;
      console.log('All test configs:', this.testConfigs);
    });
  }

  save() {
    const quizConfigModel = new QuizConfig({ ...this.config });
    this.quizConfigModel.allowBack = quizConfigModel.allowBack;
    this.quizConfigModel.name = quizConfigModel.name;
    this.quizConfigService.getTestConfigById(this.config.id).subscribe((data: any[]) => {
      // If you expect a single config, extract it from the array
      const config = data && data.length > 0 ? data[0] : null;
      console.log("check by id", config);
    });
    this.quizConfigService.createTestConfig(this.quizConfigModel)
      .then((): void => {
        console.log('Test configuration saved successfully!');
      })
      .catch((err: any): void => {
        console.log('Error saving test configuration: ' + err);
      });
  }

  emitChange() {
    this.configChange.emit(this.config);
  }
  onDeleteConfig(row:any) {
   this.quizConfigService.deleteTestConfig(row)
    .then(() => {
      // Remove the deleted config from the local array
      this.testConfigs = this.testConfigs.filter(cfg => cfg.id !== row.id);
      console.log('Test configuration deleted successfully!');
    })
    .catch((err: any) => {
      console.error('Error deleting test configuration:', err);
    });
  }
  onEditConfig(row:any) {
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
  onExportConfig(row:any) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "test-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}