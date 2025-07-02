import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockGeneratedGroups, mockDrawHistory } from '../../mocks/mock-data';
import { HttpClient } from '@angular/common/http';
import { Group, GroupGenerationConfig } from '../../models/group.model';
import { DrawHistoryEntry } from '../../models/draw-history-entry.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private http = inject(HttpClient);
    private isMock = true; // ← changer à false pour appeler le vrai backend


   generateGroups(config: GroupGenerationConfig): Observable<Group[]> {
    if (this.isMock) {
      return of(mockGeneratedGroups); // Observable local avec groupes mockés
    } else {
          // Envoi la config complète au backend pour tirage réel
      return this.http.post<Group[]>('/api/groups/draw', config, {
        withCredentials: true
      });
    }
  }


 validateGroups(groups: Group[]): Observable<{ success: boolean }> {
    if (this.isMock) {
      console.log('[MOCK] Groupes validés :', groups);
      return of({ success: true }); // succès simulé
    } else {
          // Envoi la composition finale des groupes au backend
      return this.http.post<{ success: boolean }>('/api/groups/validate', groups, {
        withCredentials: true
      });
    }
  }

  getDrawHistory(): Observable<DrawHistoryEntry[]> {
  if (this.isMock) {
    return of(mockDrawHistory);
  } else {
    // Requête GET vers le backend
    return this.http.get<DrawHistoryEntry[]>('/api/groups/draw-history', {
      withCredentials: true
    });
  }
}


}
