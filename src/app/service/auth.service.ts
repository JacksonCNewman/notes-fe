import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {JwtResponse} from "../model/JwtResponse";
import {NoteUser} from "../model/NoteUser";



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

  signUp(username:string, password:string, email:string) {
    const noteUser: NoteUser = <NoteUser>{
      username: username,
      password: password,
      email: email
    }

    return this.http.post<JwtResponse>(this.serviceBaseUrl+'/create-user', noteUser);
  }

  refreshToken() {

    console.log(localStorage.getItem('refreshToken'));
    return this.http.post<JwtResponse>(this.serviceBaseUrl + '/refresh', localStorage.getItem('refreshToken'))
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
