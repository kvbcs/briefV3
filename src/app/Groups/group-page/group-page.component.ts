import { Component, inject, signal, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupFormComponent } from '../group-form/group-form.component';
import { GroupGenerationConfig } from '../../models/group.model';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';
import { GroupDisplayComponent } from '../group-display/group-display.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-group-page',
  standalone: true,
  imports: [CommonModule, GroupFormComponent, GroupDisplayComponent],
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css'],
})
export class GroupPageComponent {
  constructor(
    @Optional() private dialogRef: MatDialogRef<GroupPageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { listId: string }
  ) {}

  groups = signal<Group[]>([]);
  private groupservice = inject(GroupService);

  onGenerate(config: GroupGenerationConfig): void {
    this.groupservice.generateGroups(config).subscribe((generatedGroups) => {
      this.groups.set(generatedGroups);
    });
  }
  onValidate(groupsFinal: Group[]) {
    this.groupservice.validateGroups(groupsFinal).subscribe({
      next: (response) => {
        console.log('Groupes enregistrés avec succès ✔️');
        // Tu peux afficher un toast ou message de confirmation ici
      },
      error: (error) => {
        console.error("Erreur lors de l'enregistrement des groupes ❌", error);
      },
    });
  }

  // fermeture de la modale groupe
  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
