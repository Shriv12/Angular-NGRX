import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createcourse, createCourseSuccess } from "./courses.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { CourseService } from "../services/course.service";
import { Course } from "src/app/models/courses.model";
import { setErrorMessage } from "src/app/shared/shared.actions";

@Injectable()

export class CoursesEffect {
    constructor(private actions$: Actions,
        private courseService: CourseService
    ){}

    createCOurse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createcourse),
            mergeMap((action) => {
                return this.courseService.createCourse(action.course).pipe(
                    map((data) => {
                        const course: Course = {...action.course, id: data.name}
                        return createCourseSuccess({course })
                    }),
                    catchError((error) => {
                        const message = 'Something went wrong'
                        return of(setErrorMessage({message}))
                    })
                )
            })
        )
    })
}