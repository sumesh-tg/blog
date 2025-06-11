import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { HomePageComponent } from './body/home-page/home-page.component';
import { BlogListComponent } from './body/blog-list/blog-list.component';
import { ContactUsComponent } from './body/contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
   standalone: true,
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule,SidebarComponent, HeaderComponent, FooterComponent, RouterModule]
})
export class DashboardComponent implements OnInit {
  @ViewChild(SidebarComponent, { read: ElementRef }) private sidebarCloseBtn: ElementRef | undefined;
  toggleAddVendorBtn = false;
  togglePageInfo=false;
  breadcrumbTxt="";
  constructor() { }

  ngOnInit(): void {
  }
  onActivate(componentRef: any) {

    setTimeout(() => {
      (componentRef instanceof HomePageComponent) ? this.togglePageInfo = false : this.togglePageInfo = true;
      (componentRef instanceof BlogListComponent) ? this.breadcrumbTxt = "Blog" : this.breadcrumbTxt = this.breadcrumbTxt;
      (componentRef instanceof ContactUsComponent) ? this.breadcrumbTxt = "Contact Us" : this.breadcrumbTxt = this.breadcrumbTxt;

      this.sidebarCloseBtn?.nativeElement.click();
    }, 200);
  }
}
