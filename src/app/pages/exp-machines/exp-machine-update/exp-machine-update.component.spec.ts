import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpMachineUpdateComponent } from './exp-machine-update.component';

describe('ExpMachineUpdateComponent', () => {
  let component: ExpMachineUpdateComponent;
  let fixture: ComponentFixture<ExpMachineUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpMachineUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpMachineUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
