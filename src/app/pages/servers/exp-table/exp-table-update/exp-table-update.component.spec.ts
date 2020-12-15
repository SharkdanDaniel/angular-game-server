import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpTableUpdateComponent } from './exp-table-update.component';

describe('ExpTableUpdateComponent', () => {
  let component: ExpTableUpdateComponent;
  let fixture: ComponentFixture<ExpTableUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpTableUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpTableUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
