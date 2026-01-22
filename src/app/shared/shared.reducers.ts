import { createReducer, on } from "@ngrx/store";
import { initialState } from "./shared.state";
import { setErrorMessage, setLoading } from "./shared.actions";

export const sharedReducer = createReducer(
    initialState,
    on(setLoading, (state, action) => {
        return {
            ...state,
            isLoading: action.value
        }
    }),
    on(setErrorMessage, (state, action) => {
        console.log(action.message);
        
        return {
            ...state,
            errorMessage: action.message
        }
    })
)
