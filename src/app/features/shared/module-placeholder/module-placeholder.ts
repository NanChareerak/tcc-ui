import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-placeholder',
  standalone: true,
  templateUrl: './module-placeholder.html',
  styleUrl: './module-placeholder.scss'
})
export class ModulePlaceholder {
  title = '';

  constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.data['title'] || 'Module';
  }
}