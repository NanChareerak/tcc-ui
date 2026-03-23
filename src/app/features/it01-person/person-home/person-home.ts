import { Component } from '@angular/core';
import { PersonListComponent } from '../person-list/person-list';


@Component({
  selector: 'app-person-home',
  standalone: true,
  imports:[
    PersonListComponent
  ],
  templateUrl: './person-home.html',
  styleUrl: './person-home.scss'
})
export class PersonHome {}