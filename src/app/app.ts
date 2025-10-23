import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1 class="text-center">Welcome to {{ title() }}!</h1>
    <p class="text-center">
      <a routerLink="/form">Home</a>
    </p>
    <p></p>
    <p class="text-center">
      <router-outlet />
    </p>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('ReactiveForms');
}
