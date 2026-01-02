export interface RegisterChildInput {
  name: string;
  surname: string;
  birthDay?: Date;
  dni?: string;
  address?: string;
}

export interface Child {
  id: number;
  name: string;
  surname: string;
  birthDay?: Date;
  dni?: string;
  address?: string;
}
