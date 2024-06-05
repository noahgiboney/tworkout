interface WeightEntry {
  weight: number;
  date: Date;
}

export interface User {
    email: string;
    name: string;
    weight?: WeightEntry[];
    heightFeet?: number;
    heightInches?: number;
    age?: number;
    avatarId?: number;
  }