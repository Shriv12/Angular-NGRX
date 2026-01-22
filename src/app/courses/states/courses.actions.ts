import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/models/courses.model";

export const getCourses = createAction('getCourses')

export const showForm = createAction('[showForm] show Form', props<{value: boolean}>())

export const createcourse = createAction('[courses] create course', props<{course: Course}>())

export const createCourseSuccess = createAction('[courses] create course success' ,props<{course: Course}>())

export const setEditMode = createAction('[isEditMode] setting Edit Mode', props<{editMode: boolean}>())

export const setSelectedCourse = createAction('[selectedCourse] setting Selected Course', props<{course: Course}>())

export const updateCourse = createAction('[courses] update Course', props<{ course: Course }>())

export const deleteCourse = createAction('[courses] delete Course', props<{ id: string }>())