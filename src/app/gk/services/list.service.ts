import { Injectable, inject } from '@angular/core';
import { List } from '../models/list';
import { Person } from '../models/person';
import { GroupDraw } from '../models/group';
import { AuthService } from './auth.service';
import { AUTH_SERVICE } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private lists: List[] = [];
  private authService = inject(AuthService); // Syntaxe moderne recommandée

  constructor() {
    this.loadLists();
  }

  /* ========== GESTION DES LISTES ========== */
  
  private loadLists(): void {
    if (!this.authService.isLoggedIn()) return;

    const user = this.authService.getCurrentUser();
    if (!user) return;

    try {
      const storedLists = localStorage.getItem(`lists_${user.id}`);
      this.lists = storedLists ? JSON.parse(storedLists) : [];
    } catch (error) {
      console.error('Error loading lists:', error);
      this.lists = [];
    }
  }

  private saveLists(): void {
    if (!this.authService.isLoggedIn()) return;

    const user = this.authService.getCurrentUser();
    if (!user) return;

    try {
      localStorage.setItem(`lists_${user.id}`, JSON.stringify(this.lists));
    } catch (error) {
      console.error('Error saving lists:', error);
    }
  }

  getAllLists(): List[] {
    this.loadLists();
    return [...this.lists];
  }

  getAllPublicLists(): List[] {
    const allLists: List[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('lists_')) {
        try {
          const userLists = JSON.parse(localStorage.getItem(key) || '[]');
          allLists.push(...userLists.filter((list: List) => !list.isPrivate));
        } catch (error) {
          console.error('Error parsing lists:', error);
        }
      }
    }

    return allLists.sort((a, b) => b.id - a.id);
  }

  getListById(id: number): List | undefined {
    this.loadLists();
    return this.lists.find(l => l.id === id);
  }

  createList(name: string): List {

    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not found');
    }

    if (this.lists.some(l => l.name === name && l.userId === user.id)) {
      throw new Error('A list with this name already exists');
    }

    const newList: List = {
      id: Date.now(),
      name,
      userId: user.id,
      isPrivate: false,
      people: [],
      draws: []
    };

    this.lists.push(newList);
    this.saveLists();
    return { ...newList };
  }

  updateList(id: number, updates: Partial<List>): List {
    if (!this.authService.isLoggedIn()) {
      throw new Error('User not authenticated');
    }

    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not found');
    }

    const listIndex = this.lists.findIndex(l => l.id === id);
    if (listIndex === -1) {
      throw new Error('List not found');
    }

    if (updates.name && 
        this.lists.some(l => 
          l.name === updates.name && 
          l.userId === user.id && 
          l.id !== id)) {
      throw new Error('A list with this name already exists');
    }

    this.lists[listIndex] = { ...this.lists[listIndex], ...updates };
    this.saveLists();
    return { ...this.lists[listIndex] };
  }

  deleteList(id: number): boolean {
    const initialLength = this.lists.length;
    this.lists = this.lists.filter(l => l.id !== id);
    
    if (initialLength !== this.lists.length) {
      this.saveLists();
      return true;
    }
    return false;
  }

  /* ========== GESTION DES PERSONNES ========== */

  addPerson(listId: number, personData: Omit<Person, 'id'>): Person {
    const list = this.lists.find(l => l.id === listId);
    console.log(list);
    
    
    if (!list) throw new Error('List not found');

    const newPerson: Person = {
      ...personData,
      id: Date.now()
    };

    list.people.push(newPerson);
    this.saveLists();
    console.log('Person added:', newPerson);
    return { ...newPerson };
  }

  updatePerson(listId: number, person: Person): Person {
    const list = this.lists.find(l => l.id === listId);
    if (!list) throw new Error('List not found');

    const index = list.people.findIndex(p => p.id === person.id);
    if (index === -1) throw new Error('Person not found');

    list.people[index] = person;
    this.saveLists();
    return { ...person };
  }

  deletePerson(listId: number, personId: number): boolean {
    const list = this.lists.find(l => l.id === listId);
    if (!list) return false;

    const initialLength = list.people.length;
    list.people = list.people.filter(p => p.id !== personId);
    
    if (initialLength !== list.people.length) {
      this.saveLists();
      return true;
    }
    return false;
  }
}