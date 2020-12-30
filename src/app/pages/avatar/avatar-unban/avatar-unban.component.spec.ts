import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarUnbanComponent } from './avatar-unban.component';

describe('AvatarUnbanComponent', () => {
  let component: AvatarUnbanComponent;
  let fixture: ComponentFixture<AvatarUnbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarUnbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarUnbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
