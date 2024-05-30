import { Routes } from '@angular/router';
import {AuthLoginComponent} from "./component/auth-login/auth-login.component";
import {HomeComponent} from "./component/home/home.component";

export const routes: Routes = [
  {path: 'login', component: AuthLoginComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];
