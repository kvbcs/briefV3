import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SignupModalComponent } from '../../components/signup-modal/signup-modal.component'; // si tu l’as déjà

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LoginFormComponent, SignupModalComponent], // ajoute d'autres composants si besoin
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
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
