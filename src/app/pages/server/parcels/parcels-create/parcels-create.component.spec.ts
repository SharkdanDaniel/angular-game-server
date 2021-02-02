import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsCreateComponent } from './parcels-create.component';

describe('ParcelsCreateComponent', () => {
  let component: ParcelsCreateComponent;
  let fixture: ComponentFixture<ParcelsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
