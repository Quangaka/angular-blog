import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: [''],
      password: [''],
    })
  }

  signUp() {
    const body = {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
    }

    this.http.post<any>("http://localhost:5000/account/sign-up", body)
    .subscribe(res => {
      const account = res;
      console.log(res)
      if(account) {
        alert("Sign Up Successfully!");
        this.signUpForm.reset();
        this.router.navigate(['login']);
      } else {
        alert("Sign Up Failed!");
      }
    }, err => {
      alert(err.error.error);
      console.log(err);
    })
  }

}
