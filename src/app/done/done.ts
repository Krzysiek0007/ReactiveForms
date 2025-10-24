import { Component, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [],
  templateUrl: `./done.html`,
  styleUrl: '../app.css', 
})
export class Done {
  data: Signal<any> = signal(history.state.formData || null);

  constructor(private router: Router) {

  }

  goBack() {
    this.router.navigate(['/form']);
  }
}