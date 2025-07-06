import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../core/services/group.service';
import { DrawDetailResponse, DrawHistoryEntry, DrawsListResponse, DrawSummary } from '../../models/draw-history-entry.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-draw-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-history.component.html',
  styleUrls: ['./draw-history.component.css'],
})
export class DrawHistoryComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  private groupService = inject(GroupService); 

  // Signal qui contiendra la liste des tirages historiques
  history = signal<DrawHistoryEntry[]>([]);

  errorMessage = signal<string | null>(null);

  // Signal pour l'entrée sélectionnée, afin d’afficher les détails
  selectedEntry = signal<DrawHistoryEntry | null>(null);

  // Charge l’historique depuis le backend
selectedDrawDetails = signal<DrawDetailResponse['data'] | null>(null);

drawSummaries = signal<DrawSummary[]>([]);

ngOnInit(): void {
  
  this.route.paramMap.subscribe(params => {
    const slug = params.get('slug');
    if (slug) {
      this.loadAllDraws(slug);
    } else {
      console.error('Slug de liste manquant');
    }
  });
}

loadDrawDetails(drawName: string): void {
  this.groupService.getDrawDetails(drawName).subscribe({
    next: (res) => {
      if (res.success && res.data) {
        this.selectedDrawDetails.set(res.data);
      } else {
        console.error('Erreur chargement détails tirage:', res.message);
      }
    },
    error: (err) => {
      console.error('Erreur réseau:', err);
    }
  });
}

loadAllDraws(listSlug: string): void {

  this.groupService.getAllDrawsForList(listSlug).subscribe({
    next: (res) => {
      if (res.success && res.data) {
        this.drawSummaries.set(res.data);
      } else {
        console.error('Erreur chargement des tirages:', res.message);
      }
    },
    error: (err) => {
      console.error('Erreur réseau:', err);
    }
  });
}
  // Sélectionne un tirage pour afficher ses détails
  selectEntry(summary: DrawSummary): void {

  // Ensuite dans loadDrawDetails:
  this.groupService.getDrawDetails(summary.name).subscribe({
    next: (res) => {
      if (res.success && res.data) {
        const fullEntry: DrawHistoryEntry = {
          ...summary,
          id: String(summary.id),
          draw_name: summary.name,
          date: new Date(summary.createdAt),
          numberOfGroups: res.data.groups_count,
          mixAge: false,
          mixGender: false,
          mixDWWM: false,
          mixLevel: false,
          groups: res.data.groups.map(g => ({
            name: g.name,
            members: (g as any).persons,
            persons_count: g.persons_count
          })),
          createdAt: summary.createdAt,
          name: summary.name,
        };

        this.selectedEntry.set(fullEntry);
      }
    }
  });
}



  // Désélectionne pour fermer les détails
  closeDetails(): void {
    this.selectedEntry.set(null);
  }
}
