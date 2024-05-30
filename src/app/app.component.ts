import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <main>
      <header class="brand-name">
        <a [routerLink]="['/home']" style="text-decoration: none; color: inherit;">

<!--          <button type="submit" class="primary">Notes</button>-->
          <button (click)="btnClick()">Notes</button>
        </a>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
    `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'notes-client';

  constructor(private router: Router) { }

  btnClick= () => {
    this.router.navigateByUrl('/home');
  };
}
