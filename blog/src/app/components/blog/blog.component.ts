import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Blog } from 'src/app/models/blog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public blog!: Blog;
  public blogId: string = '';
  public author: boolean = false;
  public account: Account = {
    _id: '',
    username: '',
    password: '',
    token: ''
  };


  constructor(private http: HttpClient, route: ActivatedRoute, private router: Router) {
    route.params.subscribe((params) => {
      this.blogId = params["id"];
    });
   }

  ngOnInit(): void {

    this.http.get<any>(`http://localhost:5000/blog/${this.blogId}`)
    .subscribe(res => {
      this.blog = res;
      if(!this.blog) {
        alert("No blog found")
      } else {
        this.http.get<any>(`http://localhost:5000/account/user/${this.blog.author}`)
        .subscribe(res => {
          this.account = res;
          this.author = this.account._id === localStorage.getItem('id');
          if(!this.account) {
            alert("No account found")
          }
        }, err => {
          console.log(err);
        })
      }
    }, err => {
      console.log(err);
    })
  }

  delete() {
    this.http.delete<any>(`http://localhost:5000/blog/${this.blogId}`)
    .subscribe(res => {
      alert("Delete blog successfully")
      this.router.navigate(['blog'])
    }, err => {
      alert(err);
      console.log(err);
    })
  }  

  edit() {
    this.router.navigate(['edit-blog'])
  }

}
