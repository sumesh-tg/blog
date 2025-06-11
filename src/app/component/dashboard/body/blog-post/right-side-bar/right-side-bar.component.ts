import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class RightSideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
