import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  server: any;

  constructor() { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.server = JSON.parse(sessionStorage.getItem('server'));
  }

  ngDoCheck(): void {
    this.refresh();

  }

}
