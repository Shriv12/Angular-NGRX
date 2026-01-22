import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Course } from 'src/app/models/courses.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private fireStorage: AngularFireStorage,
    private http: HttpClient
  ) {}
  async uploadImage(image: File) {
    const path = 'courses/images/' + Date.now() + '_' + image.name;
    const uploadTask = await this.fireStorage.upload(path, image);
    const url = await uploadTask.ref.getDownloadURL();  
    return url
  }

  createCourse(course: Course): Observable<{name: string}>{
    const url = `${environment.firebaseConfig.databaseURL}/courses.json`
    return this.http.post<{name: string}>(url, course)
  }
} 
