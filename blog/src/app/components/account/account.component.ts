import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from 'src/app/models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  listBlog: Blog[] = [];
  accountId: string = '';

  public usernameAccountLocal!: string | null;
  public roleAccountLocal!: string | null;
  public tokenAccountLocal!: string | null;

  constructor(private http: HttpClient, private route: ActivatedRoute, public userService: UserService) {
    route.params.subscribe(params => {
      this.accountId = params['id'];
    })
   }

  ngOnInit(): void {
    this.usernameAccountLocal = localStorage.getItem('username');
    this.roleAccountLocal = localStorage.getItem('role');
    this.tokenAccountLocal = localStorage.getItem('token');
    console.log(this.usernameAccountLocal, this.roleAccountLocal, this.tokenAccountLocal)
    this.listBlog = [];
    this.http.get<any>(`http://localhost:5000/account/blog/${this.accountId}`)
    .subscribe(res => {
      this.listBlog = res;
    }, err => {
      console.log(err);
    })
  }

}
