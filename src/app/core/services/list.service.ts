import { Injectable, inject } from '@angular/core';
import { List } from '../../models/list';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private lists: List[] = [];
  private authService = inject(AuthService); // Syntaxe moderne recommandée

  constructor() {
    this.loadLists();
  }


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

  public saveLists(): void {
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
          allLists.push(...userLists.filter((list: List) => !list.is_private));
        } catch (error) {
          console.error('Error parsing lists:', error);
        }
      }
    }

    return allLists.sort((a, b) => b.id - a.id);
  }

  getListById(id: number): List | undefined {
    this.loadLists();
    return this.lists.find((l) => l.id === id);
  }

  createList(name: string): List {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not found');
    }

    if (this.lists.some((l) => l.name === name && l.user_id === user.id)) {
      throw new Error('A list with this name already exists');
    }

    const newList: List = {
      id: Date.now(),
      name,
      user_id: user.id,
      is_private: false,
      description: 'Ma liste', // à compléter par formulaire plus tard
      slug: this.slugify(name),
      people: [],
      draws: [],
    };

    this.lists.push(newList);
    this.saveLists();
    return { ...newList };
  }
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }

  updateList(id: number, updates: Partial<List>): List {
    if (!this.authService.isLoggedIn()) {
      throw new Error('User not authenticated');
    }

    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User not found');
    }

    const listIndex = this.lists.findIndex((l) => l.id === id);
    if (listIndex === -1) {
      throw new Error('List not found');
    }

    if (
      updates.name &&
      this.lists.some(
        (l) => l.name === updates.name && l.user_id === user.id && l.id !== id
      )
    ) {
      throw new Error('A list with this name already exists');
    }

    this.lists[listIndex] = { ...this.lists[listIndex], ...updates };
    this.saveLists();
    return { ...this.lists[listIndex] };
  }

  deleteList(id: number): boolean {
    const initialLength = this.lists.length;
    this.lists = this.lists.filter((l) => l.id !== id);

    if (initialLength !== this.lists.length) {
      this.saveLists();
      return true;
    }
    return false;
  }
}
