import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from '../states/counter.state';
import { getCounter } from '../states/counter.selectors';
import { AppState } from 'src/app/store/app.state';
import { CoursesState } from 'src/app/courses/states/courses.state';

@Component({
  selector: 'app-counter-value',
  templateUrl: './counter-value.component.html',
  styleUrls: ['./counter-value.component.css'],
})
export class CounterValueComponent {
  // with manual types
  // constructor(private store: Store<{ counter: CounterState, courses: CoursesState }>) {}

  // using interface
  constructor(private store: Store<AppState>) {}

  // counter: number = 0;
  counter$: Observable<number> | null = null;
  counterSubscription: Subscription | null = null;

  ngOnInit() {
    // without using async pipe, need to manually subscribe/ unsubscribe the observable
    // this.store.select(getCounter).subscribe((data) => {
    //   console.log('counter subscribe called');

    //   this.counter = data
    // })

    // using async pipe, dont need to manually subscribe/ unsubscribe the observable
    this.counter$ = this.store.select(getCounter);
  }

  // If we use async pipe, ngOnDestroy is not required
  // ngOnDestroy() {
  //   if (this.counterSubscription) {
  //     this.counterSubscription.unsubscribe();
  //   }
  // }
}
