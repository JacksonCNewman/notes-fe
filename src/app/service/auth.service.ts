import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {JwtResponse} from "../model/JwtResponse";



@Injectable()
export class AuthService {
  private serviceBaseUrl: string;

  constructor(private http: HttpClient) {
    this.serviceBaseUrl = 'http://localhost:8080/auth';
  }

  login(username:string, password:string) {
    return this.http.post<JwtResponse>(this.serviceBaseUrl+'/login', {username, password})
      .pipe(
        tap(response => this.setSession(response))
      );
  }

  private setSession(authResult: JwtResponse) {
    localStorage.setItem('jwt', authResult.jwt);
    localStorage.setItem('refreshToken', authResult.refreshToken);
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
  }
}
