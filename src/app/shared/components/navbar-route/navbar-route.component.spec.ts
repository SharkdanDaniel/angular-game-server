import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRouteComponent } from './navbar-route.component';

describe('NavbarRouteComponent', () => {
  let component: NavbarRouteComponent;
  let fixture: ComponentFixture<NavbarRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
