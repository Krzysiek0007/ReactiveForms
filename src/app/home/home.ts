import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
                    @if (firstName?.invalid && (firstName?.touched || firstName?.dirty)) {
                      <div class="text-danger small mt-1">
                        @if (firstName?.errors?.['required']) { <div>Imię jest wymagane.</div> }
                      </div>
                    }
                  </div>

                  <div class="col-md-6">
                    <label for="last-name" class="form-label">Nazwisko</label>
                    <input id="last-name" type="text" class="form-control" formControlName="lastName" />
                    @if (lastName?.invalid && (lastName?.touched || lastName?.dirty)) {
                      <div class="text-danger small mt-1">
                        @if (lastName?.errors?.['required']) { <div>Nazwisko jest wymagane.</div> }
                      </div>
                    }
                  </div>

                  <div class="col-md-6">
                    <label for="birthday" class="form-label">Data urodzenia</label>
                    <input id="birthday" type="date" class="form-control" formControlName="birthday" />
                    @if (birthday?.invalid && (birthday?.touched || birthday?.dirty)) {
                      <div class="text-danger small mt-1">
                        @if (birthday?.errors?.['invalidDate']) { <div>Nieprawidłowa data.</div> }
                        @if (birthday?.errors?.['outOfRange']) {
                          <div>Data musi być między {{ birthday?.errors?.['outOfRange']?.min }} a {{ birthday?.errors?.['outOfRange']?.max }}.</div>
                        }
                      </div>
                    }
                  </div>

                  <div class="col-md-6">
                    <label for="growth" class="form-label">Wzrost (cm)</label>
                    <input id="growth" type="number" min="0" class="form-control" formControlName="growth" />
                    @if (growth?.invalid && (growth?.touched || growth?.dirty)) {
                      <div class="text-danger small mt-1">
                        @if (growth?.errors?.['min']) { <div>Wzrost musi być co najmniej 80 cm.</div> }
                        @if (growth?.errors?.['max']) { <div>Wzrost nie może przekraczać 250 cm.</div> }
                      </div>
                    }
                  </div>
                </div>

                <div class="mt-4 d-flex justify-content-end">
                  <button type="button" class="btn btn-secondary me-2" (click)="resetForm()">Anuluj</button>
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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [birthdayRangeValidator]),
    growth: new FormControl('', [Validators.min(80), Validators.max(250)]),
  });

  get firstName() { return this.applyForm.get('firstName'); }
  get lastName() { return this.applyForm.get('lastName'); }
  get birthday() { return this.applyForm.get('birthday'); }
  get growth() { return this.applyForm.get('growth'); }

  submitApplication() {
    this.router.navigate(['/form/done']);
  }

  resetForm() {
    this.applyForm.reset();
    this.applyForm.markAsPristine();
    this.applyForm.markAsUntouched();
  }
}

function birthdayRangeValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { invalidDate: true };
  }

  const today = new Date();
  const min = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  const max = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (d < min || d > max) {
    const minIso = min.toISOString();
    const minStr = min.toLocaleDateString('pl-PL'); 
    const maxStr = max.toLocaleDateString('pl-PL'); 
    return { outOfRange: { min: minStr, max: maxStr } };
  }

  return null;
}