import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topic-life',
  templateUrl: './topic-life.component.html',
  styleUrls: ['./topic-life.component.css']
})
export class TopicLifeComponent implements OnInit {

  listBlog: Blog[] = [];

  constructor(private http: HttpClient, public userService: UserService) {
   }

  ngOnInit(): void {
    this.listBlog = [];
    this.http.get<any>("http://localhost:5000/blog")
    .subscribe(res => {
        this.listBlog = res;
        this.listBlog = this.listBlog.filter(c => c.topic === 'Life')
    }, err => {
      console.log(err);
    })
  }

}
