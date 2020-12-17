import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpTableDeleteComponent } from './exp-table-delete.component';

describe('ExpTableDeleteComponent', () => {
  let component: ExpTableDeleteComponent;
  let fixture: ComponentFixture<ExpTableDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpTableDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpTableDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
