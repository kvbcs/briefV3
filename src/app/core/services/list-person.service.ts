import { inject, Injectable } from '@angular/core';
import { List } from '../../models/list';
import { Person } from '../../models/person';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root',
})
export class ListPersonService {
  private listService = inject(ListService);

  private getListById(id: number): List {
    const list = this.listService.getAllLists().find(l => l.id === id);
    if (!list) throw new Error('List not found');
    return list;
  }

  addPerson(listId: number, personData: Omit<Person, 'id'>): Person {
    const list = this.getListById(listId);
    const newPerson: Person = {
      ...personData,
      id: Date.now(),
    };

    list.people.push(newPerson);
    this.listService.saveLists();
    return { ...newPerson };
  }

  updatePerson(listId: number, person: Person): Person {
    const list = this.getListById(listId);
    const index = list.people.findIndex(p => p.id === person.id);
    if (index === -1) throw new Error('Person not found');

    list.people[index] = person;
    this.listService.saveLists();
    return { ...person };
  }

  deletePerson(listId: number, personId: number): boolean {
    const list = this.getListById(listId);
    const initialLength = list.people.length;
    list.people = list.people.filter(p => p.id !== personId);

    if (initialLength !== list.people.length) {
      this.listService.saveLists();
      return true;
    }
    return false;
  }
}
