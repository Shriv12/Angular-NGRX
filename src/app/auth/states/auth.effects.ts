import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, loginStart, loginSuccess, logout, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { AuthServices } from "../services/auth.service";
import { Router } from "@angular/router";
import { AppState } from "src/app/store/app.state";
import { Store } from "@ngrx/store";
import { setErrorMessage, setLoading } from "src/app/shared/shared.actions";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthEffects {
    constructor(private actions$: Actions, 
        private authService: AuthServices, 
        private router: Router,
        private store: Store<AppState>
    ){}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                this.store.dispatch(setLoading({value: true}))
                return this.authService.login(action.email, action.password)
                .pipe(
                    map((data) => {
                        this.store.dispatch(setLoading({value: false}))
                        const loggedUser = this.authService.formatuserData(data)
                        this.authService.saveUserInLocalStorage(loggedUser)
                    return loginSuccess({user: loggedUser, redirect: true})
                }), 
                catchError((errorResponse) => {
                    console.log(errorResponse)
                    this.store.dispatch(setLoading({value: false})) 
                    const errorMessage = this.authService.getErrorMessage(errorResponse)
                    return of(setErrorMessage({message: errorMessage}))
                    
                })
            
            )
                
            })
        )
    })

    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                this.store.dispatch(setLoading({value: true}))
                return this.authService.signup(action.email, action.password)
                .pipe(
                map((response) => {
                this.store.dispatch(setLoading({value: false}))
                const signedUser = this.authService.formatuserData(response)
                        this.authService.saveUserInLocalStorage(signedUser)

                    return signupSuccess({user: signedUser, redirect: true})
                }),
                catchError((errorResponse) => {
                    this.store.dispatch(setLoading({value: false}))
                    const errorMessage = this.authService.getErrorMessage(errorResponse)
                     return of(setErrorMessage({message: errorMessage}))
                })  
            )
            })
        )
    })

    redirect$ = createEffect(() => {
        console.log('Login success effect called');
        
        return this.actions$.pipe(
            ofType(...[loginSuccess, signupSuccess]),
            tap((action) => {
                if(action.redirect){
                    this.router.navigate(['/'])
                }
            })
        )
        
    }, {dispatch: false})

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.readUserFromLocalStorage()
                return of(loginSuccess({user, redirect: false}))
            })
        )
    })

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logout),
            map(() => {
                this.authService.logout()
                this.router.navigate(['/auth/login'])

            })
        )
    }, {dispatch: false})
 
} 