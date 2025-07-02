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
    PeopleTableComponent,
  ],
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit {
  list: List | undefined;
  listSlug!: string;
  isLoading = true;

  personForm!: FormGroup;
  editingPerson: Person | null = null;
  showPersonForm = false;
  genderOptions = Object.values(Gender);
  profileOptions = Object.values(Profile);
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private listService: ListService,
    private listPersonService: ListPersonService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
       const slug = params.get('slug'); // ✅ on récupère un string
      if (!slug) {
        this.router.navigate(['/lists']);
        return;
      }
      this.listSlug = slug; // ✅ slug est bien une string
      this.loadList();
    });
  }

  initForm(): void {
    this.personForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      gender: [Gender.NOT_SPECIFIED, Validators.required],
      frenchFluency: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
      formerDWWM: [false, Validators.required],
      technicalLevel: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
      profile: [Profile.RESERVED, Validators.required],
      age: [18, [Validators.required, Validators.min(1), Validators.max(99)]],
    });
  }

  get f() {
    return this.personForm.controls;
  }

  loadList(): void {
  this.isLoading = true;
  this.listService.getListBySlug(this.listSlug).subscribe({
    next: (data) => {
      this.list = data;
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = err.message || 'Erreur chargement liste';
      this.router.navigate(['/lists']);
      this.isLoading = false;
    }
  });
}


  togglePersonForm(person?: Person): void {
    this.showPersonForm = !this.showPersonForm;
    this.errorMessage = '';

    if (this.showPersonForm) {
      if (person) {
        this.editingPerson = person;
        this.personForm.patchValue(person);
      } else {
        this.editingPerson = null;
        this.personForm.reset({
          gender: Gender.NOT_SPECIFIED,
          frenchFluency: 1,
          formerDWWM: false,
          technicalLevel: 1,
          profile: Profile.RESERVED,
          age: 18,
        });
      }
    }
  }

  onSubmit(): void {
  if (this.personForm.invalid) return;

  const formValue = this.personForm.value;

  if (this.editingPerson) {
    this.listPersonService.updatePerson(this.editingPerson.slug, {
      ...formValue,
      list_slug: this.listSlug
    }).subscribe({
      next: () => {
        this.loadList();
        this.togglePersonForm();
      },
      error: (err) => this.errorMessage = err.message
    });
  } else {
    this.listPersonService.addPerson({
      ...formValue,
      list_slug: this.listSlug
    }).subscribe({
      next: () => {
        this.loadList();
        this.togglePersonForm();
      },
      error: (err) => this.errorMessage = err.message
    });
  }
}

deletePerson(person: Person): void {
  if (confirm(`Supprimer ${person.first_name} ?`)) {
    this.listPersonService.deletePerson(person.slug).subscribe({
      next: () => this.loadList(),
      error: (err) => this.errorMessage = err.message
    });
  }
}


  generateGroups(): void {
    this.router.navigate(['/lists', this.listSlug, 'generate']);
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
      data: { listId },
    });
  }
}
