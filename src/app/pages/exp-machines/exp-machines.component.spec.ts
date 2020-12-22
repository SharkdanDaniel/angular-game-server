import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpMachinesComponent } from './exp-machines.component';

describe('ExpMachinesComponent', () => {
  let component: ExpMachinesComponent;
  let fixture: ComponentFixture<ExpMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpMachinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
