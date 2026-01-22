import { Component, OnInit } from '@angular/core';
import { Course } from '../models/courses.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCourses, getShowForm } from './states/courses.selector';
import { setEditMode, showForm } from './states/courses.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;
  showForm$: Observable<boolean> | null = null

  constructor(private store: Store<AppState>){}

  ngOnInit() {
    this.courses$ = this.store.select(getCourses);
    // console.log('courses', this.courses$);

    this.showForm$ = this.store.select(getShowForm);
    // console.log('showForm', this.showForm$);
    
  }

  showCreateForm(){
    this.store.dispatch(setEditMode({editMode: false}))
    this.store.dispatch(showForm({value: true}))
  }

}
