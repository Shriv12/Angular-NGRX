import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AddCourseComponent } from "./add-course/add-course.component";
import { CourseCardComponent } from "./course-card/course-card.component";
import { coursesReducer } from "./states/courses.reducer";
import { StoreModule } from "@ngrx/store";
import { COURSES_STATE } from "../constants";
import { EffectsModule } from "@ngrx/effects";
import { CoursesEffect } from "./states/courses.effects";

const routes: Routes = [
    { path: '', component: CoursesComponent }
]

@NgModule({
    declarations: [
        CoursesComponent,
        CourseCardComponent,
        AddCourseComponent
    ],
    imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        EffectsModule.forFeature([CoursesEffect]),
        RouterModule.forChild(routes),
        StoreModule.forFeature(COURSES_STATE, coursesReducer)
    ],
    exports: []

})

export class CoursesModules {}