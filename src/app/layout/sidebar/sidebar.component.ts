import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  role = 'user'; // à remplacer plus tard par un service Auth ou un signal
  isOpen = signal(false); // par défaut la sidebar est cachée

  toggleSidebar(): void {
    this.isOpen.update((prev) => !prev);
  }

  logout() {
    console.log('Déconnexion');
    // redirect ou clear storage ici plus tard
  }
}
