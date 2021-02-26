import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpTableFormComponent } from './exp-table-form.component';

describe('ExpTableFormComponent', () => {
  let component: ExpTableFormComponent;
  let fixture: ComponentFixture<ExpTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpTableFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
