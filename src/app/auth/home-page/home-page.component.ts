import { Component } from '@angular/core';
import { LoginFormComponent } from '../login/login-form.component';
import { SignupModalComponent } from '../register/signup-modal.component'; // si tu l’as déjà

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LoginFormComponent, SignupModalComponent, LoginFormComponent], // ajoute d'autres composants si besoin
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
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
