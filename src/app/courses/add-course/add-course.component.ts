import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { createcourse, setEditMode, setSelectedCourse, showForm, updateCourse } from '../states/courses.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getEditMode, getSelectedCourse } from '../states/courses.selector';
import { Course } from 'src/app/models/courses.model';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

  constructor(private store: Store<AppState>,
    private courseService: CourseService
  ){}

  courseForm: FormGroup; 
  editMode: boolean = false;
  course: Course = null;
  selectedImage: File | null

  ngOnInit(){
    this.store.select(getEditMode).subscribe((value) => {
      this.editMode = value;      
    })
    this.createReactiveForm();
    this.subscribeToSelectedCourse()

  }

  createReactiveForm(){
    this.courseForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(6)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]),
      author: new FormControl(null, [
        Validators.required
      ]),
      price: new FormControl(null),
      image: new FormControl(null)
    })
  }

  subscribeToSelectedCourse(){
    this.store.select(getSelectedCourse).subscribe((data) => {
      this.course = data;
      // console.log('selected course', this.course);
      
    })

    if(this.editMode && this.course ){
      this.courseForm.patchValue(this.course)
    }
    else{
      this.courseForm.reset()
    }
  }

  hideCreateForm(){
    this.store.dispatch(showForm({value: false}))
  }

  async onCreateOrUpdateCourse(){
    // console.log('Form submitted', this.courseForm.value);
    // this.store.dispatch(setEditMode({editMode: false}))
    if(!this.courseForm.valid){
      return
    }
  
    if (this.editMode) {
      const updatedCourse: Course = {
        id: this.course.id,
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        author: this.courseForm.value.author,
        price: +this.courseForm.value.price,
        image: this.courseForm.value.image,
      };

      this.store.dispatch(updateCourse({ course: updatedCourse }));
    } else {
      // const url = await this.courseService.uploadImage(this.selectedImage);
      // this.courseForm.patchValue({ image: url });
      // console.log(url);
      // console.log(this.courseForm.value);
      this.store.dispatch(createcourse({ course: this.courseForm.value }));
    }
    this.hideCreateForm();
    this.store.dispatch(setEditMode({editMode: false}))
    this.store.dispatch(setSelectedCourse({ course: null }))

  }


  // Vaidation of formControls
  showTitleValidationError(){
    const titleControl = this.courseForm.get('title');
    // console.log('titlecontrol', titleControl);
    
    if(titleControl.touched && !titleControl.valid){
      if(titleControl.errors['required']){
        return 'Title is a required field'
      }
      if(titleControl.errors['minlength']){
        return 'Title must be atleast 6 characters'
      }
      if(titleControl.errors['maxlength']){
        return `Title can't be more than 100 characters`
      }
    }
    return ''
  }

  showDescriptionValidationError(){
    const descriptionControl = this.courseForm.get('description');
    if(descriptionControl.touched && !descriptionControl.valid){
      if(descriptionControl.errors['required']){
        return 'Description is a required field'
      }
      if(descriptionControl.errors['minlength']){
        return 'Description must be atleast 6 characters'
      }
      if(descriptionControl.errors['maxlength']){
        return `Description can't be more than 100 characters`
      }
    }
    return ''
  }

  showAuthorValidationError(){
    const authorControl = this.courseForm.get('author');
    if(authorControl.touched && !authorControl.valid){
      if(authorControl.errors['required']){
        return 'Author is a required field'
      }
    }
    return ''
    
  }

  uploadImage(event: any){
    console.log(event);
    const file = event.target.files[0]
    if(file){
      this.selectedImage = file
    }
    
  }

}
