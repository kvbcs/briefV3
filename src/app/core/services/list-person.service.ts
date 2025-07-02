import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../../models/person';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListPersonService {
  private http = inject(HttpClient);
  private apiUrl = 'http://193.134.250.16/api';

  // 🔄 Créer une nouvelle personne
  addPerson(personData: Omit<Person, 'id' | 'liste'> & { list_slug: string }): Observable<Person> {
    return this.http.post<{ success: boolean; person: Person; token: string }>(
      `${this.apiUrl}/person/new`,
      { ...personData, liste: { slug: personData.list_slug } }
    ).pipe(map(res => res.person));
  }

  // ✏️ Modifier une personne (via son slug)
  updatePerson(personSlug: string, updatedData: Partial<Person>): Observable<Person> {
    return this.http.put<{ success: boolean; person: Person; token: string }>(
      `${this.apiUrl}/person/edit/${personSlug}`,
      updatedData
    ).pipe(map(res => res.person));
  }

  // ❌ Supprimer une personne (via son slug)
  deletePerson(personSlug: string): Observable<void> {
    return this.http.delete<{ success: boolean; token: string }>(
      `${this.apiUrl}/person/delete/${personSlug}`
    ).pipe(map(() => void 0));
  }

  // 👤 Récupérer une personne par slug
  getPersonBySlug(slug: string): Observable<Person> {
    return this.http.get<{ success: boolean; person: Person; token: string }>(
      `${this.apiUrl}/person/show/${slug}`
    ).pipe(map(res => res.person));
  }

  // 👥 Récupérer toutes les personnes d'une liste
  getPersonsByListSlug(listSlug: string): Observable<Person[]> {
    return this.http.get<{ success: boolean; persons: Person[]; token: string }>(
      `${this.apiUrl}/persons/show/${listSlug}`
    ).pipe(map(res => res.persons));
  }
}
