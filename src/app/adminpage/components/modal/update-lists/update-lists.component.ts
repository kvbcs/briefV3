import { Component, EventEmitter, inject, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListsService } from '../../../services/lists.service';
import { Lists } from '../../../../../model/types';

@Component({
  selector: 'app-update-lists',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-lists.component.html',
  styleUrl: './update-lists.component.css',
})
export class UpdateListsComponent implements OnChanges {
  private listService = inject(ListsService);
  private formBuilder = inject(FormBuilder);
  @Input() showModal: boolean = false;
  @Input() listId!: number | null;
  @Output() close = new EventEmitter<void>();

  updateForm: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', [Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.minLength(3)]),
    email: new FormControl('', [Validators.email]),
  });

  list = signal<Lists | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listId'] && this.listId !== null) {
      const existingList = this.listService.getListByIdSignal(this.listId);
      if (existingList) {
        this.list.set(existingList);
        this.updateForm.patchValue({
          firstName: existingList.firstname,
          lastName: existingList.lastname,
          email: existingList.email,
        });
      }
      this.list.set(existingList);
    }
  }
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    if (this.list()) {
      this.updateForm.reset({
        firstName: this.list()?.firstname,
        lastName: this.list()?.lastname,
        email: this.list()?.email,
      });
    }
    this.close.emit();
  }

  onSubmit(): void {
    if (this.updateForm.pristine) {
      alert('Aucune modification effectuée');
      this.closeModal();
    } else if (this.updateForm.valid) {
      const updatedList = { ...this.updateForm.value };
      alert('Utilisateur mis à jour');
      console.log(updatedList);

      this.closeModal();
    }
  }
}
