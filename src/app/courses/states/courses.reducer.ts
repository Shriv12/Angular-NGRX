import { createReducer, on } from "@ngrx/store";
import { initialState } from "./courses.state";
import { createCourseSuccess, deleteCourse, getCourses, setEditMode, setSelectedCourse, showForm, updateCourse } from "./courses.actions";

export const coursesReducer = createReducer(
    initialState,
    on(showForm, (state, action) => {
        return {
            ...state,
            showForm: action.value
        }
    }),
    on(createCourseSuccess, (state, action) => {
        // const course = { ...action.course }
        // course.id = (state.courses.length + 1).toString()
        return {
            ...state,
            courses: [...state.courses, action.course]
        }
    }),
    on(setEditMode, (state, action) => {
        return {
            ...state,
            isEditMode: action.editMode
        }
    }),
    on(setSelectedCourse, (state, action) => {
        return {
            ...state,   
            selectedCourse: action.course
        }
    }),
    on(updateCourse, (state, action) => {
        const updatedCourses = state.courses.map(c => {
            if(c.id === action.course.id){
                return action.course
            }
            else{
                return c
            }
        })
        return {
            ...state,
            courses: updatedCourses
        }
    }),
    on(deleteCourse, (state, action) => {
        const deletedCourse = state.courses.filter(c => c.id !== action.id)
        return {
            ...state,
            courses: deletedCourse
        }
    })
)