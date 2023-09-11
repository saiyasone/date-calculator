import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe],
})
export class AppComponent {
  title = 'calculator-date';
  day = '';
  month = '';
  year = '';
  currentYear = '';
  form!: FormGroup;

  constructor(private _datePipe: DatePipe) {
    let year = new Date().getFullYear();
    this.currentYear = year.toString();

    this.form = new FormGroup({
      day: new FormControl('', [Validators.required, Validators.max(31)]),
      month: new FormControl('', [Validators.required, Validators.max(12)]),
      year: new FormControl('', [
        Validators.required,
        Validators.max(parseInt(this.currentYear)),
      ]),
    });
  }

  get f() {
    return this.form.controls;
  }

  onSave() {
    let docday = document.getElementById('day');
    let docmonth = document.getElementById('month');
    let docyear = document.getElementById('year');

    if (this.form.invalid) {
      docday!.style.color = '#ff5757';
      docmonth!.style.color = '#ff5757';
      docyear!.style.color = '#ff5757';
      return this.form.markAllAsTouched();
    }
    let currentDate = new Date();
    let inputValue = new Date(
      `${this.f['month'].value}/${this.f['day'].value}/${this.f['year'].value}`
    );

    let datediff = new Date(currentDate.getTime() - inputValue.getTime());

    let secs = Math.floor(+datediff / 1000);
    let mins = Math.floor(secs / 60);
    let hours = Math.floor(mins / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 31);
    let years = Math.floor(months / 12);

    months = Math.floor(months % 12);
    days = Math.floor(days % 31);

    docday!.style.color = '';
    docmonth!.style.color = '';
    docyear!.style.color = '';

    this.day = days.toString();
    this.month = months.toString();
    this.year = years.toString();
  }
}
