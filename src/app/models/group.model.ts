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
