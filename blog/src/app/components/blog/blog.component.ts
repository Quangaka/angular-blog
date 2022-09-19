import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Blog } from 'src/app/models/blog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  public blog!: Blog;
  public blogId: string = '';
  public author: boolean = false;
  public account: Account = {
    _id: '',
    username: '',
    password: '',
    token: ''
  };

  public idAccountLocal!: string | null;
  public views:number = 0;


  constructor(private http: HttpClient, route: ActivatedRoute, private router: Router, public userService: UserService) {
    route.params.subscribe((params) => {
      this.blogId = params["id"];
    });

    this.idAccountLocal = localStorage.getItem('id')
   }

  ngOnInit(): void {

    this.http.get<any>(`http://localhost:5000/blog/${this.blogId}`)
    .subscribe(res => {
      this.blog = res;
      if(!this.blog) {
        alert("No blog found")
      } else {
        this.views = this.blog.views;

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

  ngOnDestroy(): void {
    const body = {
      views: this.views + 1,
    }

    this.http.patch(`http://localhost:5000/blog/${this.blogId}`, body)
    .subscribe(res => {
    }, err => {
      console.log(err);
      alert(err)
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
}
