import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DrawResponse, Group, GroupGenerationConfig } from '../../models/group.model';
import { DrawDetailResponse, DrawHistoryEntry, DrawsListResponse } from '../../models/draw-history-entry.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private http = inject(HttpClient);
  private url = 'http://193.134.250.16';

  // Crée un tirage (draw) en répartissant les personnes en groupes
  createDraw(config: GroupGenerationConfig): Observable<DrawResponse> {
    const payload = {
      list_slug: config.listSlug,
      number_of_groups: config.numberOfGroups,
      // draw_name: config.drawName || null,
    };
    return this.http.post<DrawResponse>(`${this.url}/api/draw/new`, payload, {
    });
  }

  // Confirme (valide) un tirage finalisé
  confirmDraw(groups: Group[]): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.url}/api/groups/validate`, groups, {
    });
  }

  // Récupère l’historique des tirages
  fetchDrawHistory(): Observable<DrawHistoryEntry[]> {
    return this.http.get<DrawHistoryEntry[]>(`${this.url}/api/groups/draw-history`, {
      
    });
  }

  // Récupère les détails d’un tirage spécifique
  getDrawDetails(drawName: string): Observable<DrawDetailResponse> {
    return this.http.get<DrawDetailResponse>(`http://193.134.250.16/api/draw/show/${encodeURIComponent(drawName)}`, {
    });
  }

  // Récupère tous les tirages d’une liste donnée
  getAllDrawsForList(listSlug: string): Observable<DrawsListResponse> {
    return this.http.get<DrawsListResponse>(`http://193.134.250.16/api/draws/show/${encodeURIComponent(listSlug)}`, {
    });
  }
}
