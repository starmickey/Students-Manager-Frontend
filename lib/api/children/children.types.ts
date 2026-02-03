export interface Child {
  id: number;
  name: string;
  surname: string;
  birthDay: Date | null;
  dni: string | null;
  address: string | null;
}

export interface ChildApi {
  id: number;
  name: string;
  surname: string;
  birthDay?: string | null;
  dni?: string | null;
  address?: string | null;
}
