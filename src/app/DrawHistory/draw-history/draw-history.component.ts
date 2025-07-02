import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../core/services/group.service';
import { DrawHistoryEntry } from '../../models/draw-history-entry.model';


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

  // Signal pour l'entrée sélectionnée, afin d’afficher les détails
  selectedEntry = signal<DrawHistoryEntry | null>(null);

  ngOnInit(): void {
    this.loadHistory();
  }

  // Charge l’historique depuis le backend
 loadHistory(): void {
  this.groupService.getDrawHistory().subscribe({
    next: (entries) => this.history.set(entries),
    error: (err) => console.error('Erreur chargement historique', err),
  });
}


  // Sélectionne un tirage pour afficher ses détails
  selectEntry(entry: DrawHistoryEntry): void {
    this.selectedEntry.set(entry);
  }

  // Désélectionne pour fermer les détails
  closeDetails(): void {
    this.selectedEntry.set(null);
  }
}
