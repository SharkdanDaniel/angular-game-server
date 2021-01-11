import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableItemsUpdateComponent } from './available-items-update.component';

describe('AvailableItemsUpdateComponent', () => {
  let component: AvailableItemsUpdateComponent;
  let fixture: ComponentFixture<AvailableItemsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableItemsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableItemsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
