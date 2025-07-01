// mock à supprimer après le merge avec groups
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DrawHistoryEntry } from '../models/draw-history-entry.model';

@Injectable({
  providedIn: 'root',
})
export class DrawHistoryService {
  getDrawHistory(): Observable<DrawHistoryEntry[]> {
    // Données mock
    const mockHistory: DrawHistoryEntry[] = [
      {
        id: '1',
        date: new Date(),
        numberOfGroups: 3,
        mixAge: true,
        mixGender: false,
        mixDWWM: true,
        mixLevel: false,
        groups: [/* ... */],
      },
      // autres tirages...
    ];

    return of(mockHistory);
  }
}
