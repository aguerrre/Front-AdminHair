import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminHair';

  constructor(private router: Router, private authService: AuthService, private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: environment.google_client,
      callback: (response: any) => this.handleCredentialResponse(response)
    });
  }

  handleCredentialResponse(response: any) {
    this.authService.loginGoogle(response.credential).subscribe({
      next: (resp: any) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        })
      }
    })
  }
}
