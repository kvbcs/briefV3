import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalComponent } from './update-users.component';

describe('UpdateModalComponent', () => {
  let component: UpdateModalComponent;
  let fixture: ComponentFixture<UpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
