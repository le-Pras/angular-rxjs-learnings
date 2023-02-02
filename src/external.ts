import { Observable, of } from 'rxjs';

export const name$ = of('Alice', 'In', 'Wonderland');

export function storeDataOnServer(data: string): Observable<string> {
  return new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next(`Saved successfully: ${data}`);
      subscriber.complete();
    }, 5000);
  });
}

export function storedataOnServerError(data: string): Observable<string> {
  return new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.error(new Error('failed'));
    }, 5000);
  });
}
