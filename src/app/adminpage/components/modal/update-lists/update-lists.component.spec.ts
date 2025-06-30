import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListsComponent } from './update-lists.component';

describe('UpdateListsComponent', () => {
  let component: UpdateListsComponent;
  let fixture: ComponentFixture<UpdateListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
