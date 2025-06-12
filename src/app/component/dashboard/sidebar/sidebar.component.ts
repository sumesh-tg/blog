import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [RouterModule,CommonModule],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  enableOnlineTest = environment.enableOnlineTest;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    // You can add logic here to add/remove a CSS class or emit an event
    // For example, add/remove a class on the sidebar div:
    // document.querySelector('.page-sidebar')?.classList.toggle('collapsed');
  }
}
