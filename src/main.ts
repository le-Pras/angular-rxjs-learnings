import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { name$, storeDataOnServer, storedataOnServerError } from './external';
import {
  combineLatest,
  forkJoin,
  from,
  fromEvent,
  interval,
  Observable,
  of,
  timer,
} from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

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
/* const ajax$ = ajax<any>('https://random-data-api.com/api/v2/beers');

ajax$.subscribe((data) => console.log('sub 1', data.response.brand));
ajax$.subscribe((data) => console.log('sub 2', data.response.brand));
ajax$.subscribe((data) => console.log('sub 3', data.response.brand));
ajax$.subscribe((data) => console.log('sub 4', data.response.brand));

*/
//Hot Observable

/* const helloButton = document.querySelector('button#hello');

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

*/
//Creational functions
//1) of()
/*of('Alice', 'Ben', 'Charlie').subscribe({
  next: value => console.log(value),
  complete: () => console.log('end...')
})

const observervable$ = new Observable(sub => {
  sub.next('Alice');
  sub.next('Ben');
  sub.next('Charlie');
  sub.complete();
})

observervable$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('end...')
})

// using functions
ownOwnOf('Alice', 'Ben', 'charlie').subscribe({
  next: (val) => console.log(val),
  complete: () => console.log('over...')
})


function ownOwnOf(...args: string[]) : Observable<string>{ 
  return new Observable<string>(sub => {
    for(let i = 0; i < args.length; i++) {
      sub.next(args[i])
    }
    sub.complete();
  })
}*/

//2) from()
/*from(['Alice', 'Ben', 'Charlie']).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('end...'),
});

const somePromise = new Promise((resolve, reject) => {
  // resolve('resolved!')
  reject('rejected')
})

const observableFromPromises$ = from(somePromise)

observableFromPromises$.subscribe({
  next: value => console.log(value),
  error: (err) => console.log(err, err),
  complete: () => console.log('end')
})
*/

//3) fromEvent() - using rxjs method

/*const helloButton = document.querySelector('button#hello');

const subscription = fromEvent<MouseEvent>(helloButton, 'click').subscribe(
  (event) => console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  console.log('unsubscribe');
  subscription.unsubscribe();
}, 5000);
*/

//fromEvent - using observable and not using operators
/*const helloButton = document.querySelector('button#hello');

const helloButton$ = new Observable<MouseEvent>((sub) => {
  const subEvent = (event) => {
    console.log('event started');
    sub.next(event);
  };

  helloButton.addEventListener('click', subEvent);

  return () => {
    helloButton.removeEventListener('click', subEvent);
  };
});

const subscription = helloButton$.subscribe((event) =>
  console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  console.log('unsubs');
  subscription.unsubscribe();
}, 5000);
*/

//timer in rxjs
/*
const timer$ = new Observable<number>((sub) => {
  const timeOut = setTimeout(() => {
    sub.next(0);
    sub.complete();
  }, 2000);

  return clearTimeout(timeOut);
});


const subscription = timer$.subscribe((subscribed) => {
  console.log('sub', subscribed);
});
*/
/*
const subscription = timer(2000).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('complete'),
});
*/
/*
setTimeout(() => {
  console.log('unsub');
  subscription.unsubscribe();
}, 1000);
*/

//interval()

/* const interval$ = new Observable((sub) => {
  let counter = 0;
  const intervalId = setInterval(() => {
    console.log('timeout');
    sub.next(counter++);
    sub.complete();
  }, 1000);

  return clearInterval(intervalId);
});

const subscription = interval$.subscribe({
  next: (val) => console.log(val),
});
*/
/*
const subscription = interval(1000).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('completed'),
});
*/
/*
setTimeout(() => {
  subscription.unsubscribe();
  console.log('unsub');
}, 5000);
*/
/*
const randomNames$ = ajax('https://random-data-api.com/api/name/random_name');
const randomNation$ = ajax(
  'https://random-data-api.com/api/nation/random_nation'
);
const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');
*/
/*
randomNames$.subscribe((sub: AjaxResponse<any>) =>
  console.log(sub.response.first_name)
);
randomNation$.subscribe((sub: AjaxResponse<any>) =>
  console.log(sub.response.capital)
);
randomFood$.subscribe((sub: AjaxResponse<any>) =>
  console.log(sub.response.dish)
);
*/

//ForkJoin no error Scenario
/*
forkJoin([randomNames$, randomNation$, randomFood$]).subscribe(
  ([nameAjax, nationAjax, foodAjax]: [
    AjaxResponse<any>,
    AjaxResponse<any>,
    AjaxResponse<any>
  ]) => {
    console.log(
      `${nameAjax.response.first_name} from ${nationAjax.response.capital} loves to eat ${foodAjax.response.dish}`
    );
  }
);
*/
//ForkJoin error scenario
/*const a$ = new Observable((sub) => {
  setTimeout(() => {
    sub.next('A');
    sub.complete();
  }, 3000);
});

const b$ = new Observable((sub) => {
  setTimeout(() => {
    sub.error('Failure!');
  }, 5000);
});

forkJoin([a$, b$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('err', err),
});
*/

//combineLatest with example
/*
const temperatureInput = document.getElementById('temperature-input');
const conversionDropdown = document.getElementById('conversion-dropdown');
const resultText = document.getElementById('result-text');

const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
const conversionInputEvent$ = fromEvent(conversionDropdown, 'input');

combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
  ([temperature, conversion]) => {
    const temp = Number(temperature.target['value']);
    const conv = conversion.target['value'];

    let result: number;
    if (conv === 'f-to-c') {
      result = ((temp - 32) * 5) / 9;
    } else if (conv === 'c-to-f') {
      result = (temp * 9) / 5 + 32;
    }
    resultText.innerText = String(result);
    console.log(
      'temperature, conversion',
      temperature.target['value'],
      conversion.target['value']
    );
  }
);
*/

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
