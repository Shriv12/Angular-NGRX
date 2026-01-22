import { createAction, props } from "@ngrx/store";

export const setLoading = createAction('[isLoading] set loading state', props<{value: boolean}>())

export const setErrorMessage = createAction('[errorMessage] set error message', props<{message: string}>())