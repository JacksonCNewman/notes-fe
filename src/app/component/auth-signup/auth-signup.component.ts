import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <div class="login-card">
      <div class="card-title">
        <h1>New User</h1>
      </div>
      <form class="form-group" [formGroup]="loginForm" (ngSubmit)="signUp()">
        <input name="username" formControlName="username" placeholder="Username">
        <input type="password" formControlName="password" placeholder="Password">
        <input type="email" formControlName="email" placeholder="email">
        <button>Submit</button>
      </form>
      <a class="card-text" routerLink="/login" routerLinkActive = “active”>Login</a>
    </div>
  `,
  styleUrl: './auth-signup.component.css',
  providers: [AuthService]
})
export class AuthSignupComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  signUp() {
    const val = this.loginForm.value;

    if (val.username && val.password && val.email) {
      this.authService.signUp(val.username, val.password, val.email)
        .subscribe(
          () => {
            console.log("User has been created");
            this.router.navigateByUrl('/login');
          }
        );
    }
  }
}
