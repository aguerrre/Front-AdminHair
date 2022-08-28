import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public viewPass = false;
  public viewPassC = false;

  constructor() { }

  ngOnInit(): void {
  }

  viewPassword() {
    return this.viewPass ? this.viewPass = false : this.viewPass = true;
  }
  viewPasswordC() {
    return this.viewPassC ? this.viewPassC = false : this.viewPassC = true;
  }

}
