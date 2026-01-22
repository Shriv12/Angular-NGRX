import { authReducer } from "../auth/states/auth.reducers";
import { AuthState } from "../auth/states/auth.state";
import { sharedReducer } from "../shared/shared.reducers";
import { SharedState } from "../shared/shared.state";

export interface AppState{
    auth: AuthState,
    shared: SharedState
}

export const appReducer = {
    auth: authReducer,
    shared: sharedReducer   
}