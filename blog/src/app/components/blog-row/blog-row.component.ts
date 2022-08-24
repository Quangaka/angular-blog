import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-row',
  templateUrl: './blog-row.component.html',
  styleUrls: ['./blog-row.component.css']
})
export class BlogRowComponent implements OnInit {

  @Input() blog!: Blog;

  constructor() { }

  ngOnInit(): void {
  }

}
