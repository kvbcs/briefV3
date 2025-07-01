// Représente une personne dans un groupe
export interface Person {
  id: string;
  name: string;
  // Optionnel : tu peux ajouter des champs utiles pour la génération
  gender?: string;
  age?: number;
  dwwm?: boolean;
  level?: number;
  profile?: string;
  frenchFluency?: number;
}

// Groupe généré ou tiré
export interface Group {
  id?: number;              // utilisé pour les groupes enregistrés
  name: string;
  members: Person[];        // on normalise autour de `members`
}

// Tirage complet, stocké dans l’historique
export interface GroupDraw {
  id: number;
  date: string;
  listId: number;
  groups: Group[];
  criteria: MixCriteria;
}

// Configuration de génération de groupes
export interface GroupGenerationConfig {
  listId: string;
  numberOfGroups: number;
  mixAge: boolean;
  mixDWWM: boolean;
  mixGender: boolean;
  mixLevel: boolean;
  mixProfile?: boolean;
  mixFrenchFluency?: boolean;
}

// Critères utilisés lors d’un tirage
export interface MixCriteria {
  mixGender: boolean;
  mixFrenchFluency: boolean;
  mixDWWM: boolean;
  mixLevel: boolean;
  mixProfile: boolean;
  mixAge: boolean;
}
