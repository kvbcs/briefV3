import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group, GroupGenerationConfig } from '../models/group.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private http = inject(HttpClient);
    private isMock = true; // ← changer à false pour appeler le vrai backend


   generateGroups(config: GroupGenerationConfig): Observable<Group[]> {
    if (this.isMock) {
      const mockGroups: Group[] = [];

      for (let i = 0; i < config.numberOfGroups; i++) {
        mockGroups.push({
          name: `Groupe ${i + 1}`,
          members: [
            { id: `p${i}1`, name: `Personne ${i * 2 + 1}` },
            { id: `p${i}2`, name: `Personne ${i * 2 + 2}` }
          ]
        });
      }

      return of(mockGroups);
    } else {
      return this.http.post<Group[]>('/api/groups/draw', config, {
        withCredentials: true
      });
    }
  }


 validateGroups(groups: Group[]): Observable<{ success: boolean }> {
    if (this.isMock) {
      console.log('[MOCK] Groupes validés :', groups);
      return of({ success: true });
    } else {
      return this.http.post<{ success: boolean }>('/api/groups/validate', groups, {
        withCredentials: true
      });
    }
  }


}
