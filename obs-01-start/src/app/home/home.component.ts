import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  // intervalSubscription: Subscription;
  customIntervalSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.intervalSubscription = interval(1000).subscribe(
    //   count => console.log('built-in interval func: ' + count)
    // )

    let customIntervalObservable = new Observable<number>(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Counter is greater than 3!'));
        }

        count++;
      }, 1000)
    });

    customIntervalObservable.pipe(
      filter(data => {
        return data !== 0;
      }),
      map(data => {
        return 'customIntervalObservable with pipe ' + data;
      }))
      .subscribe(
        data => console.log(data)
      );

    this.customIntervalSubscription = customIntervalObservable.subscribe(
      count => console.log('custom interval func: ' + count),
      (error: Error) => console.log(error),
      () => console.log('customIntervalObservable completed!')
    );
  }

  // Notes: Angular will unsubscribe itself if it's not a custom observable
  ngOnDestroy(): void {
    // this.intervalSubscription.unsubscribe();
    this.customIntervalSubscription.unsubscribe();
  }
}
