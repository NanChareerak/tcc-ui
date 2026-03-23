export interface ProfileItem {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  age: number;
  profileBase64: string;
  occupationId: number;
  occupationName: string;
  sex: 'M' | 'F';
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  profileBase64: string;
  occupationId: number;
  sex: 'M' | 'F';
  address?: string;
}

export interface UpdateProfileRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  profileBase64: string;
  occupationId: number;
  sex: 'M' | 'F';
  address?: string;
}

export interface SaveProfileResponse {
  id: number;
  message: string;
}

export interface DeleteProfileResponse {
  id: number;
  deleted: boolean;
}

export interface ProfileSearchRequest {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
  keyword?: string;
}