import { Group } from './group.model';

export interface DrawHistoryEntry {
  draw_name: string; // <-- ajout du nom du tirage
  id: string;
  date: Date;
  numberOfGroups: number;
  mixAge: boolean;
  mixGender: boolean;
  mixDWWM: boolean;
  mixLevel: boolean;
  groups: Group[];
  createdAt: string; // Date de création du tirage
  name: string; // Nom du tirage
}
export interface DrawGroup {
  name: string;
  persons: Array<{ first_name: string; last_name: string }>;
  persons_count: number;
}

export interface DrawDetailResponse {
  success: boolean;
  token?: string;
  data?: {
    groups: DrawGroup[];
    groups_count: number;
  };
  message?: string;
}
export interface DrawSummary {
  id: number;
  name: string;
  createdAt: string;
  // draw_name: string; // Nom du tirage
  //   success: boolean;

}

export interface DrawsListResponse {
  success: boolean;
  token?: string;
  data?: DrawSummary[];
  message?: string;
   draw_name: string; // <-- ajout du nom du tirage
  id: string;
  date: Date;
  numberOfGroups: number;
  mixAge: boolean;
  mixGender: boolean;
  mixDWWM: boolean;
  mixLevel: boolean;
  groups: Group[];
  createdAt: string; // Date de création du tirage
  name: string; // Nom du tirage
}
