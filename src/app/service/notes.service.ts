import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Note} from "../model/Note";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private serviceBaseUrl: string;

  constructor(private http: HttpClient) {
    this.serviceBaseUrl = 'http://localhost:8080/notes';
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.serviceBaseUrl+'/notes')
      .pipe(
        tap(_ => console.log('fetched notes'))
      );
  }

}
