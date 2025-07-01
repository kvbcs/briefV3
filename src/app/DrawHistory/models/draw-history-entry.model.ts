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

// mocké en attendant le merge avec groups
export interface Member {
  id: string;
  name: string;
}

export interface Group {
  name: string;
  members: Member[];
}
