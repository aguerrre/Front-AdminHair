import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit, AfterViewInit {

  public token: string = '';
  public verified: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ token }) => this.token = token);
  }
  ngAfterViewInit(): void {
    this.authService.verify(this.token).subscribe({
      next: (resp: any) => {
        this.verified = true;
      },
      error: (err) => {
        console.log(err)
        this.verified = false;
        Toast.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.msg
        });
      }
    });
  }

}
