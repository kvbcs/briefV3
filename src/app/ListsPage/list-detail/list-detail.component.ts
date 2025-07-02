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
  listId!: number;
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
      const id = Number(params.get('id'));
      if (isNaN(id)) {
        this.router.navigate(['/lists']);
        return;
      }
      this.listId = id;
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
    try {
      this.isLoading = true;
      this.list = this.listService.getListById(this.listId);
      this.isLoading = false;

      if (!this.list) {
        this.router.navigate(['/lists']);
      }
    } catch (error: any) {
      this.errorMessage = error.message;
      this.isLoading = false;
    }
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

    try {
      if (this.editingPerson) {
        const updatedPerson: Person = {
          ...this.editingPerson,
          ...this.personForm.value,
        };
        this.listPersonService.updatePerson(this.listId, updatedPerson);
      } else {
        this.listPersonService.addPerson(this.listId, this.personForm.value);
      }

      this.loadList();
      this.togglePersonForm();
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  deletePerson(person: Person): void {
    if (confirm(`Supprimer ${person.first_name} ?`)) {
      try {
        this.listPersonService.deletePerson(this.listId, person.id);
        this.loadList();
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }

  generateGroups(): void {
    this.router.navigate(['/lists', this.listId, 'generate']);
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
