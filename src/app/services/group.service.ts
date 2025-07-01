import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DrawHistoryEntry, Group, GroupGenerationConfig } from '../models/group.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private http = inject(HttpClient);
    private isMock = true; // ← changer à false pour appeler le vrai backend


   generateGroups(config: GroupGenerationConfig): Observable<Group[]> {
    if (this.isMock) {
          // Génère des groupes factices localement selon la config
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

      return of(mockGroups); // Observable local avec groupes mockés
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
    // Données mock pour l'historique
    const mockHistory: DrawHistoryEntry[] = [
      {
        id: '1',
        date: new Date(),
        numberOfGroups: 3,
        mixAge: true,
        mixGender: false,
        mixDWWM: true,
        mixLevel: false,
        groups: [
          {
            name: 'Groupe 1',
            members: [{ id: 'p11', name: 'Personne 1' }, { id: 'p12', name: 'Personne 2' }]
          },
          {
            name: 'Groupe 2',
            members: [{ id: 'p21', name: 'Personne 3' }]
          }
        ],
      },
      // Autres tirages mockés si besoin
    ];
    
    return of(mockHistory);
  } else {
    // Requête GET vers le backend
    return this.http.get<DrawHistoryEntry[]>('/api/groups/draw-history', {
      withCredentials: true
    });
  }
}


}
