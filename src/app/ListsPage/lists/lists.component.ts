import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ListService } from '../../core/services/list.service';
import { List } from '../../models/list';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsUserComponent implements OnInit {
  lists: List[] = [];
  newListForm!: FormGroup;
  showNewListForm = false;
  errorMessage = '';
  isLoading = true;

  constructor(
    private listService: ListService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadLists();
    this.newListForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  loadLists(): void {
  this.isLoading = true;
  this.listService.getAllLists().subscribe({
    next: (lists) => {
      this.lists = lists;
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = err.message || 'Erreur lors du chargement des listes.';
      this.isLoading = false;
    }
  });
}
  toggleNewListForm(): void {
    this.showNewListForm = !this.showNewListForm;
    if (this.showNewListForm) {
      this.newListForm.reset();
      this.errorMessage = '';
    }
  }

  onSubmit(): void {
  if (this.newListForm.invalid) return;

  const payload = {
    name: this.newListForm.controls['name'].value
  };

  this.listService.createList(payload).subscribe({
    next: () => {
      this.loadLists();
      this.toggleNewListForm();
    },
    error: (err) => {
      this.errorMessage = err.message || 'Erreur lors de la création de la liste.';
    }
  });
}


  viewList(slug: string): void {
  this.router.navigate(['/lists', slug]);
}


  deleteList(event: Event, listId: number): void {
  event.stopPropagation();

  if (confirm('Supprimer cette liste ?')) {
    this.listService.deleteList(listId).subscribe({
      next: () => this.loadLists(),
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors de la suppression de la liste.';
      }
    });
  }
}

}
