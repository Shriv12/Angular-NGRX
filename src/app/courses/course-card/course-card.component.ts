import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/courses.model';
import { AppState } from 'src/app/store/app.state';
import { deleteCourse, setEditMode, setSelectedCourse, showForm } from '../states/courses.actions';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
  @Input() course: Course | null = null;

  constructor(private store:Store<AppState>){}

  

  ngOnInit(){
    // console.log('courses', this.course)
  }
  onCourseEdit(){
    this.store.dispatch(showForm({value: true}))
    this.store.dispatch(setEditMode({editMode: true}))
    this.store.dispatch(setSelectedCourse({ course: this.course}))
  }

  onDeleteCourse(){
    const confirmModel = confirm('Do you want to delete the course');
    if(confirmModel){
      this.store.dispatch(deleteCourse({id: this.course.id}))
    }
  }
}
