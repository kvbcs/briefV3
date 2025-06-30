import { Component, Input, Signal, EventEmitter, Output } from '@angular/core';
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
  @Input() groups!: Group[];
  @Output() validate = new EventEmitter<Group[]>();
  isValidated = false;

  // Pour lier les drop lists entre elles
  get dropListIds(): string[] {
    return this.groups.map((_, i) => `group-${i}`);
  }

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
  onValidate(): void {
    this.isValidated = true;
    this.validate.emit(this.groups);
  }
}
