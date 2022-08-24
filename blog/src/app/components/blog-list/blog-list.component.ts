import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  listBlog: Blog[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listBlog = [];
    this.http.get<any>("http://localhost:5000/blog")
    .subscribe(res => {
      this.listBlog = res;
    }, err => {
      console.log(err);
    })
  }
}