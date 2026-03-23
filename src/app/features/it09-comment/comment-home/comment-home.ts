
import { Component } from '@angular/core';
import { CommentThreadComponent } from '../comment-thread/comment-thread';


@Component({
  selector: 'app-comment-home',
  standalone: true,
  imports: [CommentThreadComponent],
  templateUrl: './comment-home.html',
  styleUrl: './comment-home.scss',
})
export class CommentHomeComponent {}