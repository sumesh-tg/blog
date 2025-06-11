import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { environment } from 'environments/environment';
import { routes } from './app.routes';
import { quizRoutes } from './quiz-dashboard/quiz-dashboard-routing.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { adminRoutes } from './admin/admin-routing.module';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([...routes, ...quizRoutes,...adminRoutes]),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirestore(() => getFirestore()),
  ]
};
