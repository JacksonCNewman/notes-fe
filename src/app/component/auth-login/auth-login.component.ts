import {Component} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form">
      <fieldset>
        <legend>Login</legend>
        <div class="form-field">
          <label>Username:</label>
          <input name="username" formControlName="username">
        </div>
        <div class="form-field">
          <label>Password:</label>
          <input name="password" formControlName="password"
                 type="password">
        </div>
      </fieldset>
      <div class="form-buttons">
        <button class="button button-primary"
                (click)="login()">Login
        </button>
      </div>
    </form>
  `,
  styleUrl: './auth-login.component.css',
  providers: [AuthService]
})
export class AuthLoginComponent {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    const val = this.form.value;

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
}
