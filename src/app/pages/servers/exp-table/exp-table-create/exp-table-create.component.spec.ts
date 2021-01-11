import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpTableCreateComponent } from './exp-table-create.component';

describe('ExpTableCreateComponent', () => {
  let component: ExpTableCreateComponent;
  let fixture: ComponentFixture<ExpTableCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpTableCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpTableCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
