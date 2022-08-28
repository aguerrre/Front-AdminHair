import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public viewPass = false;

  constructor() { }

  ngOnInit(): void {
  }

  viewPassword() {
    return this.viewPass ? this.viewPass = false : this.viewPass = true;
  }

}
