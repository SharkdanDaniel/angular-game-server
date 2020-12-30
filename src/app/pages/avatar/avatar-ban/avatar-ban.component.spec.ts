import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarBanComponent } from './avatar-ban.component';

describe('AvatarBanComponent', () => {
  let component: AvatarBanComponent;
  let fixture: ComponentFixture<AvatarBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarBanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
