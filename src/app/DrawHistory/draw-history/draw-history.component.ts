import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../core/services/group.service';
import { DrawDetailResponse, DrawHistoryEntry, DrawSummary } from '../../models/draw-history-entry.model';


@Component({
  selector: 'app-draw-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-history.component.html',
  styleUrls: ['./draw-history.component.css'],
})
export class DrawHistoryComponent implements OnInit {

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
  const listSlug = 'le-slug-de-ta-liste'; // ou récupéré dynamiquement
  this.loadAllDraws(listSlug);
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
  selectEntry(entry: DrawHistoryEntry): void {
  this.selectedEntry.set(entry);
  this.loadDrawDetails(entry.draw_name);  // Assure-toi que DrawHistoryEntry a ce champ
}


  // Désélectionne pour fermer les détails
  closeDetails(): void {
    this.selectedEntry.set(null);
  }
}
