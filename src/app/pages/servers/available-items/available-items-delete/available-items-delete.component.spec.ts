import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableItemsDeleteComponent } from './available-items-delete.component';

describe('AvailableItemsDeleteComponent', () => {
  let component: AvailableItemsDeleteComponent;
  let fixture: ComponentFixture<AvailableItemsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableItemsDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableItemsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
