import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { name$, storeDataOnServer, storedataOnServerError } from './external';
import { Observable } from 'rxjs';
// name$.subscribe((value) => console.log(value));

// storeDataOnServer('Some value').subscribe((value) => console.log(value));

// storedataOnServerError('Some Error value').subscribe({
//   next: (value) => console.log(value),
//   error: (err) => console.log('Error when saving', err.message),
// });

const obs$ = new Observable<string>((sub) => {
  console.log('In observable...');
  sub.next('Alice');
  setTimeout(() => sub.next('Ben'), 2000);
  setTimeout(() => sub.next('charlie'), 4000);
});

// const observer$ = {
//   next: (value) => console.log(value),
// };
// obs$.subscribe(observer$);
console.log('sub 1');
const subscription = obs$.subscribe((value) => console.log('sub 1', value));

setTimeout(() => {
  obs$.subscribe((value) => console.log('sub 2', value));
}, 1000);

// setTimeout(() => {
//   console.log('unsubscription happening');
//   subscription.unsubscribe();
// }, 3000);

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
