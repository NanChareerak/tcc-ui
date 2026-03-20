import { Injectable } from '@angular/core';
import { PersonItem } from '../../../models/person-model';
import { PageResponse, PaginationRequest } from '../../../models/common-model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly mockPersons: PersonItem[] = [
    {
      id: 1,
      firstName: 'Somchai',
      lastName: 'Jaidee',
      birthDate: '1995-01-15',
      age: 29,
      address: 'Bangkok',
    },
    {
      id: 2,
      firstName: 'Suda',
      lastName: 'Dechdee',
      birthDate: '1998-03-20',
      age: 26,
      address: 'Chiang Mai',
    },
    {
      id: 3,
      firstName: 'Anan',
      lastName: 'Wongsa',
      birthDate: '1992-07-11',
      age: 32,
      address: 'Khon Kaen',
    },
    {
      id: 4,
      firstName: 'Kanya',
      lastName: 'Meechai',
      birthDate: '1999-05-09',
      age: 25,
      address: 'Phuket',
    },
    {
      id: 5,
      firstName: 'Narin',
      lastName: 'Sukjai',
      birthDate: '1990-12-01',
      age: 34,
      address: 'Rayong',
    },
    {
      id: 6,
      firstName: 'Patcha',
      lastName: 'Thongdee',
      birthDate: '1997-09-18',
      age: 27,
      address: 'Ayutthaya',
    },
    {
      id: 7,
      firstName: 'Wit',
      lastName: 'Srichan',
      birthDate: '1993-08-14',
      age: 31,
      address: 'Udon Thani',
    },
    {
      id: 8,
      firstName: 'Malee',
      lastName: 'Chotika',
      birthDate: '1996-06-25',
      age: 28,
      address: 'Surat Thani',
    },
    {
      id: 9,
      firstName: 'Preecha',
      lastName: 'Yingyong',
      birthDate: '1989-04-17',
      age: 35,
      address: 'Nakhon Pathom',
    },
    {
      id: 10,
      firstName: 'Lalita',
      lastName: 'Rattanakul',
      birthDate: '2000-02-10',
      age: 24,
      address: 'Chonburi',
    },
    {
      id: 11,
      firstName: 'Thanawat',
      lastName: 'Boonsri',
      birthDate: '1994-11-30',
      age: 30,
      address: 'Pathum Thani',
    },
    {
      id: 12,
      firstName: 'Orathai',
      lastName: 'Nimnuan',
      birthDate: '1991-10-05',
      age: 33,
      address: 'Lampang',
    },
    {
      id: 13,
      firstName: 'Sakda',
      lastName: 'Maneerat',
      birthDate: '1995-03-03',
      age: 29,
      address: 'Nakhon Ratchasima',
    },
    {
      id: 14,
      firstName: 'Sirin',
      lastName: 'Intarak',
      birthDate: '1998-01-22',
      age: 26,
      address: 'Trang',
    },
    {
      id: 15,
      firstName: 'Krit',
      lastName: 'Pansuk',
      birthDate: '1996-04-28',
      age: 28,
      address: 'Songkhla',
    },
    {
      id: 16,
      firstName: 'Nicha',
      lastName: 'Bamrung',
      birthDate: '1993-12-12',
      age: 31,
      address: 'Loei',
    },
    {
      id: 17,
      firstName: 'Arthit',
      lastName: 'Kongkaew',
      birthDate: '1990-06-07',
      age: 34,
      address: 'Nan',
    },
    {
      id: 18,
      firstName: 'Pim',
      lastName: 'Tansakul',
      birthDate: '2001-08-19',
      age: 23,
      address: 'Chiang Rai',
    },
    {
      id: 19,
      firstName: 'Yada',
      lastName: 'Keawmanee',
      birthDate: '1997-07-01',
      age: 27,
      address: 'Samut Prakan',
    },
    {
      id: 20,
      firstName: 'Tee',
      lastName: 'Suksawat',
      birthDate: '1992-09-13',
      age: 32,
      address: 'Nonthaburi',
    },
  ];

  getPersons(request: PaginationRequest): PageResponse<PersonItem> {
    const keyword = (request.keyword || '').trim().toLowerCase();

    const filtered = !keyword
      ? this.mockPersons
      : this.mockPersons.filter(
          (item) =>
            item.firstName.toLowerCase().includes(keyword) ||
            item.lastName.toLowerCase().includes(keyword) ||
            `${item.firstName} ${item.lastName}`.toLowerCase().includes(keyword) ||
            item.address.toLowerCase().includes(keyword),
        );

    const total = filtered.length;
    const pageSize = request.pageSize;
    const page = request.page;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const datas = filtered.slice(skip, skip + take);

    return {
      datas,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
