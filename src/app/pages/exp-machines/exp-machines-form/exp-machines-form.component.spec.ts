import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpMachinesFormComponent } from './exp-machines-form.component';

describe('ExpMachinesFormComponent', () => {
  let component: ExpMachinesFormComponent;
  let fixture: ComponentFixture<ExpMachinesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpMachinesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpMachinesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
