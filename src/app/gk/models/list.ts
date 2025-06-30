import { GroupDraw } from './group';
import { Person } from './person';

export interface List {
  id: number;
  name: string;
  userId: number;
  isPrivate: boolean;
  people: Person[];
  draws: GroupDraw[];

}
