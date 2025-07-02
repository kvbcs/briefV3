import { Injectable, inject } from '@angular/core';
import { List } from '../../models/list';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private http = inject(HttpClient);
  private apiUrl = 'http://193.134.250.16/api/list';

  getAllLists(): Observable<List[]> {
    return this.http
      .get<{ success: boolean; data: List[] }>(`${this.apiUrl}/show/me`)
      .pipe(map((res) => res.data));
  }

  getListBySlug(slug: string): Observable<List> {
    return this.http
      .get<{ success: boolean; data: List }>(`${this.apiUrl}/show/${slug}`)
      .pipe(map((res) => res.data));
  }

  createList(payload: { name: string; description?: string }): Observable<List> {
    return this.http
      .post<{ success: boolean; data: List }>(`${this.apiUrl}/new`, payload)
      .pipe(map((res) => res.data));
  }

  updateList(id: number, payload: { name?: string; description?: string }): Observable<List> {
    return this.http
      .put<{ success: boolean; data: List }>(`${this.apiUrl}/${id}/edit`, payload)
      .pipe(map((res) => res.data));
  }

  deleteList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Optionnel : utile pour la prévisualisation
  private slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
}
