import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-route',
  templateUrl: './navbar-route.component.html',
  styleUrls: ['./navbar-route.component.scss']
})
export class NavbarRouteComponent implements OnInit {
  @Input() router: string;
  @Input() first: string;
  @Input() current: string;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

}
