import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private auth = inject(AuthService);

    // Stocke le rôle courant de l'utilisateur (admin ou user)
  userRole: 'admin' | 'user' = 'user';

    // Signal représentant l'état d'ouverture de la sidebar
  isOpen = signal(false); 

  ngOnInit(): void {
        // Récupération du rôle de l'utilisateur via AuthService
    this.userRole = this.auth.getCurrentUserRole();
    // En mode desktop, la sidebar est toujours visible
    if (window.innerWidth >= 768) {
      this.isOpen.set(true);
    }
  }

    // Détermine si l'utilisateur courant est un admin
  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

    // Ouvre ou ferme la sidebar (mobile uniquement)
  toggleSidebar(): void {
    this.isOpen.update((prev) => !prev);
  }
    // Ferme la sidebar (après navigation sur mobile)
  closeSidebar(): void {
    this.isOpen.set(false);
  }
  // Simule une déconnexion (sera complété plus tard)
  logout() {
    console.log('Déconnexion');
    // redirect ou clear storage ici plus tard
  }
}
