// ==============================
// Request Models
// ==============================

export interface GetPersonListRequest {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
}

export interface CreatePersonRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // format: yyyy-MM-dd
  address: string;
}

export interface UpdatePersonRequest extends CreatePersonRequest {
  id: number;
}


// ==============================
// Response Model (UI ใช้ตัวนี้)
// ==============================

export interface PersonModel {
  id: number;

  firstName: string;
  lastName: string;
  fullName: string;

  dateOfBirth: string; // yyyy-MM-dd
  age: number;

  address: string;

  // Base fields (จาก backend BaseEntity)
  createdBy: string;
  createdDate: string;
  updatedBy?: string;
  updatedDate?: string;
  isActive: boolean;
}