import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Lists, Users } from '../../../model/types';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent implements OnInit {
  private http = inject(HttpClient);

  users = signal<Users[]>([]);
  lists = signal<Lists[]>([]);

  ngOnInit(): void {
    this.http.get<Users[]>('/assets/users.json').subscribe((data) => {
      this.users.set(data);
    });
    this.http.get<Lists[]>('/assets/lists.json').subscribe((data) => {
      this.lists.set(data);
    });
  } // nombre de listes créées par utilisateur
  listAmount = signal<number>(0);
  // ◦ nombre de personnes par liste en moyenne
  personAmount = signal<number>(0);
  // ◦ nombre de groupes créés par liste en moyenne
  groupAmount = signal<number>(0);
  // ◦ nombre de listes partagées
  sharedListsAmount = signal<number>(0);
  // ◦ nombre d’utilisateurs associés à une liste partagée en moyenne
  sharedUsersAmount = signal<number>(0);
  // modifier le titre du site
  siteTitle = signal<string>('');
  // modifier le logo
  logo = signal<string>('');
  // modifier les couleurs principales
  primaryColor = signal<string>('#D10000');
  secondaryColor = signal<string>('#FFFFFF');
  tertiaryColor = signal<string>('#333333');
}
