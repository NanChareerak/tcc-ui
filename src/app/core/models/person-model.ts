

export interface PersonItem {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  birthDate: string;
  age: number;
  address: string;
}


export interface PersonCreateRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
  address: string;
}