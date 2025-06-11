import { Component, OnInit } from '@angular/core';
import { AdSidebarComponent } from '../ad-sidebar/ad-sidebar.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  imports: [AdSidebarComponent]
})
export class AdminHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
