export interface GroupGenerationConfig {
  listId: string; // À compléter avec la liste sélectionnée
  numberOfGroups: number;
  mixAge: boolean;
  mixDWWM: boolean;
  mixGender: boolean;
  mixLevel: boolean;
}

export interface Person {
  id: string;
  name: string;
}

export interface Group {
  name: string;
  members: Person[];
}

// à enlever quand j'aurais merge
export interface DrawHistoryEntry {
  id: string;
  date: Date;
  numberOfGroups: number;
  mixAge: boolean;
  mixGender: boolean;
  mixDWWM: boolean;
  mixLevel: boolean;
  groups: Group[];
}
