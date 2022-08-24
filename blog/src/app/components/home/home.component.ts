import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public idAccountLocal!: string | null;

  constructor() { }

  ngOnInit(): void {
    this.idAccountLocal = localStorage.getItem('id');
  }
}
