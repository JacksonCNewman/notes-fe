import { Component } from '@angular/core';
import {Note} from "../../model/Note";
import {NotesService} from "../../service/notes.service";
import {NoteComponent} from "../note/note.component";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NoteComponent, NgFor],
  template: `
    <section class="results">
      <app-note
        *ngFor="let note of notes"
        [note]="note"
      ></app-note>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  notes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notesService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

}
