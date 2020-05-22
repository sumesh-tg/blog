import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { FooterComponent } from './components/dashboard/footer/footer.component';
import { AddVendorComponent } from './components/dashboard/forms/add-vendor/add-vendor.component';
import { AddFeatureComponent } from './components/dashboard/forms/add-feature/add-feature.component';
import { VendorListComponent } from './components/dashboard/body/vendor-list/vendor-list.component';
import { FeaturesListComponent } from './components/dashboard/body/features-list/features-list.component';
import { PlanListComponent } from './components/dashboard/body/plan-list/plan-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { MustMatchDirective } from './shared/validators/must-match.directive';
import { ConfirmationDialogComponent } from './shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './shared/dialogs/confirmation-dialog/confirmation-dialog.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { BlogListComponent } from './components/dashboard/body/blog-list/blog-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddPostComponent } from './components/dashboard/forms/add-post/add-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BlogPostComponent } from './components/dashboard/body/blog-post/blog-post.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AddVendorComponent,
    AddFeatureComponent,
    VendorListComponent,
    FeaturesListComponent,
    PlanListComponent,
    MustMatchDirective,
    ConfirmationDialogComponent,
    BlogListComponent,
    AddPostComponent,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgxPaginationModule,
    CKEditorModule
  ],
  providers: [
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
