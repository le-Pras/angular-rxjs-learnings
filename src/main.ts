import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { name$, storeDataOnServer, storedataOnServerError } from './external';

// name$.subscribe((value) => console.log(value));

// storeDataOnServer('Some value').subscribe((value) => console.log(value));

storedataOnServerError('Some Error value').subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('Error when saving', err.message),
});
@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
