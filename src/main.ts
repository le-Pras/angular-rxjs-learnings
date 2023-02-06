import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { name$, storeDataOnServer, storedataOnServerError } from './external';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

//Basics of Observable Observers and subscription
// name$.subscribe((value) => console.log(value));

// storeDataOnServer('Some value').subscribe((value) => console.log(value));

// storedataOnServerError('Some Error value').subscribe({
//   next: (value) => console.log(value),
//   error: (err) => console.log('Error when saving', err.message),
// });

// const obs$ = new Observable<string>((sub) => {
//   console.log('In observable...');
//   sub.next('Alice');
//   setTimeout(() => sub.next('Ben'), 2000);
//   setTimeout(() => sub.next('charlie'), 4000);
// });

// // const observer$ = {
// //   next: (value) => console.log(value),
// // };
// // obs$.subscribe(observer$);
// console.log('sub 1');
// const subscription = obs$.subscribe((value) => console.log('sub 1', value));

//multiple subscription
// setTimeout(() => {
//   obs$.subscribe((value) => console.log('sub 2', value));
// }, 1000);

// setTimeout(() => {
//   console.log('unsubscription happening');
//   subscription.unsubscribe();
// }, 3000);

//Value emission (subscription life cycle)

// const obs$ = new Observable<string>((sub) => {
//   console.log('Observale executed');
//   sub.next('Alice');
//   sub.next('Ben');
//   setTimeout(() => {
//     sub.next('charlie');
//     //complete notification
//     // sub.complete();
//   }, 2000);

//   setTimeout(() => sub.error(new Error('Failure')), 4000);
//   //TearDown logic used for freeing up memory and other logical overflow issues
//   return () => {
//     console.log('teardown');
//   };
// });

// console.log('before sub');
// obs$.subscribe({
//   next: (value) => console.log(value),
//   error: (err) => console.log(err.message),
//   complete: () => console.log('complete'),
// });
// console.log('after sub');

//unSubscription in detail

/*
const interval$ = new Observable<number>((sub) => {
  let count = 1;
  const setIntervalId = setInterval(() => {
    sub.next(count++);
  }, 2000);

  return () => {
    clearInterval(setIntervalId);
  };
});

const subscription = interval$.subscribe((value) => console.log(value));

setTimeout(() => {
  console.log('unsub');
  subscription.unsubscribe();
}, 7000);

*/
//Cold Observable
const ajax$ = ajax<any>('https://random-data-api.com/api/v2/beers');

ajax$.subscribe((data) => console.log('sub 1', data.response.brand));
ajax$.subscribe((data) => console.log('sub 2', data.response.brand));
ajax$.subscribe((data) => console.log('sub 3', data.response.brand));
ajax$.subscribe((data) => console.log('sub 4', data.response.brand));

//Hot Observable

const helloButton = document.querySelector('button#hello');

console.log('button', helloButton);
const helloClick$ = new Observable((sub) => {
  helloButton.addEventListener('click', (event) => {
    sub.next(event);
  });
});

helloClick$.subscribe((event) => {
  console.log('sub 1', event);
});

setTimeout(() => {
  console.log('sub 2 starts');
  helloClick$.subscribe((event) => {
    console.log('sub2', event);
  });
}, 5000);
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
