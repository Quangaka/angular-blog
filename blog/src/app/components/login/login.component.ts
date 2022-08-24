import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    })
  }

  login(){
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.http.post<any>("http://localhost:5000/account/login", body)
    .subscribe(res => {
      const account = res;
      if(account) {
        localStorage.setItem('id', account._id);
        localStorage.setItem('username', account.username);
        localStorage.setItem('token', account.token);
        this.loginForm.reset();
        this.router.navigate(['blog']);
      } else {
        alert("Login Failed");
      }
    }, err => {
      alert("Something went wrong!!")
      console.log(err);
    })
  }

}
