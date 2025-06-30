import { Component, Input, EventEmitter, Output } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Group } from '../../models/group.model';

@Component({
  selector: 'app-group-display',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './group-display.component.html',
  styleUrls: ['./group-display.component.css'],
})
export class GroupDisplayComponent {
  /** 
   * Liste des groupes à afficher, reçue du composant parent.
   * Chaque groupe contient un nom et une liste de membres. 
   */
  @Input() groups!: Group[];
    /**
   * Événement émis lors de la validation des groupes,
   * pour notifier le parent avec la liste finale des groupes.
   */
  @Output() validate = new EventEmitter<Group[]>();

    /** Indique si les groupes ont été validés (affecte l'affichage/interaction) */
  isValidated = false;

  /**
   * Retourne un tableau d’identifiants uniques pour les zones de drag & drop.
   * Permet de lier chaque liste de membres à un identifiant distinct.
   */
  get dropListIds(): string[] {
    return this.groups.map((_, i) => `group-${i}`);
  }

  /**
   * Gestionnaire de l'événement de drag & drop.
   * Si l’élément est déplacé dans la même liste, on réordonne.
   * Sinon, on déplace l’élément d’une liste à une autre.
   *
   * @param event - Détails de l’opération drag & drop.
   * @param targetIndex - Index du groupe cible où déposer l’élément.
   */
  onDrop(event: CdkDragDrop<any[]>, targetIndex: number): void {
    const groups = this.groups;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        groups[targetIndex].members,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const sourceIndex = groups.findIndex(
        (g) => g.members === event.previousContainer.data
      );
      transferArrayItem(
        groups[sourceIndex].members,
        groups[targetIndex].members,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

   /**
   * Valide les groupes : verrouille l’état et émet l’événement avec les groupes actuels.
   * Le parent pourra ensuite enregistrer ou traiter ces groupes validés.
   */
  onValidate(): void {
    this.isValidated = true;
    this.validate.emit(this.groups);
  }
}
