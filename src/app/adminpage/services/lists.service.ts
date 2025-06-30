import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lists } from '../../../model/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  mockLists = signal<Lists[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Lists[]>('/assets/lists.json').subscribe((data) => {
      this.mockLists.set(data);
    });
  }

  //Temporaire en attendant le back
  private baseUrl: string = 'http://localhost:3000/api/lists';

  getListsSignal() {
    return this.mockLists;
  }

  getLists(): Observable<Lists[]> {
    return of(this.mockLists());
    // return this.http.get<Lists[]>(`${this.baseUrl}/show`)
  }

  getList(id: number): Observable<Lists | undefined> {
    const list = this.mockLists().find((list) => list.id === id);
    return of(list);
    // return this.http.get<Lists>(`${this.baseUrl}/show/${id}`);
  }

  updateList(id: number, updatedList: Lists): Observable<Lists> {
    const index = this.mockLists().findIndex((l) => l.id === id);
    if (index !== -1) {
      this.mockLists()[index] = { ...updatedList, id }; // conserve l'ID d'origine
    }
    return of(this.mockLists()[index]);
    // return this.http.put<Lists>(`${this.baseUrl}/update/${id}`, list);
  }

  deleteList(id: number): Observable<Lists[]> {
    const filtered = this.mockLists().filter((list) => list.id === id);
    this.mockLists.set(filtered);
    return of(filtered);
    // return this.http.delete<Lists>(`${this.baseUrl}/delete/${id}`)
  }
}
