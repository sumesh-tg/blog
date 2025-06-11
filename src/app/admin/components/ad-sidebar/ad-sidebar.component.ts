import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdBodyComponent } from "../ad-body/ad-body.component";

@Component({
  selector: 'app-ad-sidebar',
  templateUrl: './ad-sidebar.component.html',
  styleUrls: ['./ad-sidebar.component.scss'],
  imports: [CommonModule, FormsModule, AdBodyComponent],
  standalone:true
})
export class AdSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
