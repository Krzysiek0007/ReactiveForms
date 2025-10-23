import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  template: `
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <h2 class="card-title mb-3">Dane osobowe</h2>

              <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="first-name" class="form-label">Imię</label>
                    <input id="first-name" type="text" class="form-control" formControlName="firstName" />
                  </div>

                  <div class="col-md-6">
                    <label for="last-name" class="form-label">Nazwisko</label>
                    <input id="last-name" type="text" class="form-control" formControlName="lastName" />
                  </div>

                  <div class="col-md-6">
                    <label for="birthday" class="form-label">Data urodzenia</label>
                    <input id="birthday" type="date" class="form-control" formControlName="birthday" />
                  </div>

                  <div class="col-md-6">
                    <label for="growth" class="form-label">Wzrost (cm)</label>
                    <input id="growth" type="number" min="0" class="form-control" formControlName="growth" />
                  </div>
                </div>

                <div class="mt-4 d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary" [disabled]="applyForm.invalid">
                    Zapisz
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Home {
  constructor(private router: Router) {}

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthday: new FormControl(''),
    growth: new FormControl(''),
  });

  submitApplication() {
    this.router.navigate(['/form/done']);
  }
}
