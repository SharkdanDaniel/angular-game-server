import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsDeleteComponent } from './parcels-delete.component';

describe('ParcelsDeleteComponent', () => {
  let component: ParcelsDeleteComponent;
  let fixture: ComponentFixture<ParcelsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelsDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
