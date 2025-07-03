import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person';

@Component({
  selector: 'app-people-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-table.component.html',
})
export class PeopleTableComponent {
  @Input() persons: Person[] = [];
  @Output() editPerson = new EventEmitter<Person>();
  @Output() deletePerson = new EventEmitter<Person>();
}
