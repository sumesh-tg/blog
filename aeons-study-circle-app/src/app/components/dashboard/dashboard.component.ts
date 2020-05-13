import { Component, OnInit } from '@angular/core';
import { VendorListComponent } from './body/vendor-list/vendor-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  toggleAddVendorBtn = false;
  constructor() { }

  ngOnInit(): void {
  }
  onActivate(componentRef) {
    (componentRef instanceof VendorListComponent) ? this.toggleAddVendorBtn = false : this.toggleAddVendorBtn = true;
  }
}
