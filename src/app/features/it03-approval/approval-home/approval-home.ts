import { Component } from '@angular/core';
import { ApprovalListComponent } from '../approval-list/approval-list';


@Component({
  selector: 'app-approval-home',
  standalone: true,
  imports: [ApprovalListComponent],
  templateUrl: './approval-home.html',
  styleUrl: './approval-home.scss'
})
export class ApprovalHomeComponent {}