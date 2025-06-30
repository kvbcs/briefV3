import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {

  sidebarLinks = [
  { id: 'lists', label: 'Mes listes', path: '/lists', roles: ['user', 'admin'] },
  { id: 'groups', label: 'Mes groupes', path: '/groups', roles: ['user', 'admin'] },
  { id: 'admin-listes', label: 'Listes (admin)', path: '/admin/listes', roles: ['admin'] },
  { id: 'admin-users', label: 'Utilisateurs', path: '/admin/users', roles: ['admin'] },
  { id: 'admin-stats', label: 'Statistiques', path: '/admin/stats', roles: ['admin'] }
  ];
  
  private auth = inject(AuthService);

  selectedLink = '';

  // Stocke le rôle courant de l'utilisateur (admin ou user)
  userRole: 'admin' | 'user' = 'user';

  // Signal représentant l'état d'ouverture de la sidebar
  isOpen = signal(false);

  setActive(link: string) {
    this.selectedLink = link;
  }
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
