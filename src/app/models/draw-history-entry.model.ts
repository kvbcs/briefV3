import { Group } from "./group.model";

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
