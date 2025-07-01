import { Component, inject, signal, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupFormComponent } from '../group-form/group-form.component';
import { GroupGenerationConfig } from '../../models/group.model';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';
import { GroupDisplayComponent } from '../group-display/group-display.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  // gestion de la validation
  loading = signal(false);
  isValidated = signal(false);
  private router = inject(Router);

  onGenerate(config: GroupGenerationConfig): void {
    this.groupservice.generateGroups(config).subscribe({
      next: (generatedGroups) => this.groups.set(generatedGroups),
      error: (error) =>
        console.error('Erreur lors de la génération des groupes ❌', error),
    });
  }

handleValidateAndRedirect(groupsFinal: Group[]) {
  if (this.loading()) return; // protège contre clics multiples
  this.loading.set(true);

  this.groupservice.validateGroups(groupsFinal).subscribe({
    next: () => {
      this.isValidated.set(true);
      this.loading.set(false);
      this.router.navigate(['/historique']);
    },
    error: (error) => {
      this.loading.set(false);
      console.error('Erreur lors de la validation', error);
      // Ajouter affichage message d’erreur utilisateur ici
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
