import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawHistoryComponent } from './draw-history.component';

describe('DrawHistoryComponent', () => {
  let component: DrawHistoryComponent;
  let fixture: ComponentFixture<DrawHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
