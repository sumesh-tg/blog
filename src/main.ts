import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import Quill from 'quill';
// import ImageResize from 'quill-image-resize-module';

// Quill.register('modules/imageResize', ImageResize);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
