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
  userRole: 'admin' | 'user' = 'user';
  isOpen = signal(false); // par défaut la sidebar est cachée

  ngOnInit(): void {
    this.userRole = this.auth.getCurrentUserRole();
    // Si écran large (desktop), la sidebar reste ouverte
    if (window.innerWidth >= 768) {
      this.isOpen.set(true);
    }
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  toggleSidebar(): void {
    this.isOpen.update((prev) => !prev);
  }
  closeSidebar(): void {
    this.isOpen.set(false);
  }

  logout() {
    console.log('Déconnexion');
    // redirect ou clear storage ici plus tard
  }
}
