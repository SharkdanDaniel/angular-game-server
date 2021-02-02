import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsUpdateComponent } from './parcels-update.component';

describe('ParcelsUpdateComponent', () => {
  let component: ParcelsUpdateComponent;
  let fixture: ComponentFixture<ParcelsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
