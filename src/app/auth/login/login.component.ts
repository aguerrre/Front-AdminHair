import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public viewPass = false;
  public formSubmitted = false;
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [localStorage.getItem('email') ? true : false],
  });

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.googleButtonInit();
  }

  googleButtonInit() {
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.loginForm.value).subscribe({
        next: (resp: any) => {
          this.loginForm.get('remember')?.value ?
            localStorage.setItem('email', this.loginForm.get('email')?.value!) :
            localStorage.removeItem('email');
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log(err)
          Toast.fire({ icon: 'error', text: err.error.msg, title: 'Error' });
        }
      });
    }
  }

  notValidField(field: string): boolean {
    return this.loginForm.get(field)?.invalid && this.formSubmitted ? true : false;
  }
  viewPassword() {
    return this.viewPass ? this.viewPass = false : this.viewPass = true;
  }

}
