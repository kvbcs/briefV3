import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListsComponent } from './lists.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  imports: [ListsComponent], // ou UsersComponent
  providers: [
    provideHttpClient(withInterceptorsFromDi()) // ✅
  ]
}).compileComponents();

    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function compileComponents() {
  throw new Error('Function not implemented.');
}

