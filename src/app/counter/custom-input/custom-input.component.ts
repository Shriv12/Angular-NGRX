import { Component } from '@angular/core';
import { CounterState } from '../states/counter.state';
import { Store } from '@ngrx/store';
import { customIncrement, toggleCustomInput } from '../states/counter.actions';
import { getToggle } from '../states/counter.selectors';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { CoursesState } from 'src/app/courses/states/courses.state';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent {
  // with manual types
    // constructor(private store: Store<{ counter: CounterState, courses: CoursesState }>) {}
  
    // using interface
    constructor(private store: Store<AppState>) {}

  customValue: number = 10;
  // showCustomValue: boolean = false;
  showCustomValue$: Observable<boolean> | null = null;

  ngOnInit() {
    // this.store.select(getToggle).subscribe((data) => {
    //   console.log('Toggle subscribe called');
    //   return (this.showCustomValue = data);
    // });


    this.showCustomValue$ = this.store.select(getToggle);
  }

  onCustomeValueBtnClicked() {
    this.store.dispatch(customIncrement({ value: +this.customValue }));
  }

  toggleClicked() {
    this.store.dispatch(toggleCustomInput());
  }
}
