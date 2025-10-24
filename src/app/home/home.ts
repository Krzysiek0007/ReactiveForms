import { Component } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: `./home.html`,
  styleUrl: '../app.css', 
})
export class Home {
  constructor(private router: Router) {}

  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [birthdayRangeValidator]),
    growth: new FormControl('', [Validators.min(80), Validators.max(250)]),
  });

  get firstName() {
    return this.applyForm.get('firstName');
  }
  get lastName() {
    return this.applyForm.get('lastName');
  }
  get birthday() {
    return this.applyForm.get('birthday');
  }
  get growth() {
    return this.applyForm.get('growth');
  }

  submitApplication() {
    this.router.navigate(['/form/done'], {
      state: { formData: this.applyForm.value },
    });
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
    const minStr = min.toLocaleDateString('pl-PL');
    const maxStr = max.toLocaleDateString('pl-PL');
    return { outOfRange: { min: minStr, max: maxStr } };
  }

  return null;
}
