import {Component} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <div class="login-card">
      <div class="card-title">
        <h1>Login</h1>
      </div>
      <form class="form-group" [formGroup]="loginForm" (ngSubmit)="login()">
        <input name="username" formControlName="username" placeholder="Username">
        <input type="password" formControlName="password" placeholder="Password">
        <button>Submit</button>
      </form>
      <a class="card-text" routerLink="/signup" routerLinkActive = “active”>Sign up</a>
    </div>
  `,
  styleUrl: './auth-login.component.css',
  providers: [AuthService]
})
export class AuthLoginComponent {
  loginForm:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    const val = this.loginForm.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe(
          () => {
            console.log("User is logged in");
            this.router.navigateByUrl('/home');
          }
        );
    }
  }

  openRegistrationPage(){
    // this.router.navigateByUrl("/signup");
  }
}
