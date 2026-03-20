import { Component } from '@angular/core';
import { PersonList } from '../person-list/person-list';

@Component({
  selector: 'app-person-home',
  standalone: true,
  imports:[
    PersonList
  ],
  templateUrl: './person-home.html',
  styleUrl: './person-home.scss'
})
export class PersonHome {}