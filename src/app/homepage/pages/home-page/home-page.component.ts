import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SignupModalComponent } from '../../components/signup-modal/signup-modal.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SignupModalComponent, LoginFormComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
