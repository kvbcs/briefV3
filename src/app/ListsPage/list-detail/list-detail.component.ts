import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ListService } from '../../core/services/list.service';
import { ListPersonService } from '../../core/services/list-person.service';
import { List } from '../../models/list';
import { Person, Gender, Profile } from '../../models/person';

import { GroupPageComponent } from '../../Groups/group-page/group-page.component';
import { PersonFormComponent } from './person-form.component';
import { PeopleTableComponent } from './people-table.component';

@Component({
  selector: 'app-list-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonFormComponent,
    PeopleTableComponent
  ],
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  list: List | undefined;
  listSlug!: string;
  isLoading = true;

  personForm!: FormGroup;
  showPersonForm = false;
  editingPerson: Person | null = null;
  errorMessage = '';
  genderOptions = Object.values(Gender);
  profileOptions = Object.values(Profile);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly listService: ListService,
    private readonly listPersonService: ListPersonService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (!slug) {
        this.router.navigate(['/lists']);
        return;
      }
      this.listSlug = slug;
      this.loadList();
    });
  }

  initForm(): void {
    this.personForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      french_level: [null, [Validators.required, Validators.min(1), Validators.max(4)]],
      tech_level: [null, [Validators.required, Validators.min(1), Validators.max(4)]],
      dwwm: [false, Validators.required],
      profile: ['', Validators.required]
    });
  }

loadList(): void {
  this.isLoading = true;

  this.listService.getListBySlug(this.listSlug).subscribe({
    next: data => {
      this.list = data;

      // 🟢 Maintenant on récupère les personnes associées à la liste
      this.listPersonService.getPersonsByListSlug(this.listSlug).subscribe({
        next: persons => {
          if (this.list) {
            this.list.people = persons; // 👈 on attache les personnes à la propriété "people"
          }
          this.isLoading = false;
        },
        error: err => {
          this.errorMessage = err.message || 'Erreur chargement des personnes';
          this.isLoading = false;
        }
      });
    },
    error: err => {
      this.errorMessage = err.message || 'Erreur chargement liste';
      this.router.navigate(['/lists']);
      this.isLoading = false;
    }
  });
}


  togglePersonForm(): void {
    const dialogRef = this.dialog.open(PersonFormComponent, {
      panelClass: 'person-form-dialog',
      width: '90vw',
      maxHeight: '90vh',
      autoFocus: false,
      data: {
        listSlug: this.list?.slug
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadList(); // 👈 recharge la liste à partir de l'API
      }
    });
  }

  onSubmit(): void {

    if (this.personForm.invalid) return;

    const formValue = this.personForm.value;

    const personPayload = {
      list: this.listSlug,
      first_name: formValue.first_name?.trim(),
      last_name: formValue.last_name?.trim(),
      gender: formValue.gender,
      age: formValue.age,
      french_level: formValue.french_level,
      tech_level: formValue.tech_level,
      dwwm: formValue.dwwm,
      profile: formValue.profile
    };

    this.listPersonService.addPerson(personPayload).subscribe({
      next: () => {
        this.loadList();
        this.togglePersonForm();
      },
      error: err => {
        this.errorMessage = err?.error?.errors?.first_name?.[0] || err.message || 'Erreur lors de l’envoi';
      }
    });
  }

  deletePerson(person: Person): void {
    if (confirm(`Supprimer ${person.first_name} ${person.last_name} ?`)) {
      this.listPersonService.deletePerson(person.slug).subscribe({
        next: () => this.loadList(),
        error: err => this.errorMessage = err.message
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/lists']);
  }

  openGroupDialog(listId: string): void {
    this.dialog.open(GroupPageComponent, {
      panelClass: 'group-dialog',
      width: '90vw',
      maxHeight: '90vh',
      autoFocus: false,
      data: { listId }
    });
  }
}
