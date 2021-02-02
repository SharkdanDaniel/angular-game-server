import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableItemsCreateComponent } from './available-items-create.component';

describe('AvailableItemsCreateComponent', () => {
  let component: AvailableItemsCreateComponent;
  let fixture: ComponentFixture<AvailableItemsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableItemsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableItemsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
