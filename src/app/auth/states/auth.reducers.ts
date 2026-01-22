import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginSuccess, logout, signupSuccess } from "./auth.actions";

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        console.log('Login success reducer called');
        return {
            ...state,
            user: action.user
        }
    }),
    on(signupSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(logout, (state) => {
        return {
            ...state,
            user: null
        }
    })
)
