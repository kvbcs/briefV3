import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css',
})
export class UpdateModalComponent {
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.close.emit();
  }
}
