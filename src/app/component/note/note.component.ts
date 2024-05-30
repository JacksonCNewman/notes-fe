import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Note} from "../../model/Note";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ note.title }}</h2>
      <p class="listing-location">{{ note.description }}</p>
      <a [routerLink]="['/details', note.noteId]">Details</a>
    </section>
  `,
  styleUrl: './note.component.css',
  providers: [AuthService]
})
export class NoteComponent {
  @Input() note!: Note;
}
