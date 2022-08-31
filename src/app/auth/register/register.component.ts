import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { RegisterForm } from '../../interfaces/register-form.interface';
import { AuthService } from '../../services/auth.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public viewPass = false;
  public viewPassC = false;
  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    c_password: ['', []],
  }, {
    validators: this.passwordsEquals('password', 'c_password')
  }
  );

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  viewPassword() {
    return this.viewPass ? this.viewPass = false : this.viewPass = true;
  }
  viewPasswordC() {
    return this.viewPassC ? this.viewPassC = false : this.viewPassC = true;
  }

  registerUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      let registerFormI: RegisterForm = this.registerForm.value;
      this.authService.create(registerFormI).subscribe({
        next: (resp: any) => {
          Toast.fire({
            icon: 'success',
            text: `Se ha enviado un email a ${resp.email} para verificar su dirección de correo. 
                    Compruebe su bandeja de entrada.`
          });
          this.router.navigateByUrl('/inicio-sesion');
        },
        error: (err) => {
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.msg
          });
        }
      })
    }
  }

  notValidField(field: string): boolean {
    return this.registerForm.get(field)?.invalid && this.formSubmitted ? true : false;
  }

  passwordsEquals(password: string, c_password: string) {
    return (control: AbstractControl) => {
      const pass1Control = control.get(password);
      const pass2Control = control.get(c_password);

      if (password === null || c_password === null) {
        return null;
      }
      if (pass1Control?.value !== pass2Control?.value) {
        pass2Control?.setErrors({ notEquals: true });
        return ({ notEquals: true });
      } else {
        pass2Control?.setErrors(null);
        return null;
      }
    }
  }

}
