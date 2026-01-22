import { CommonModule } from "@angular/common";
import { NgModule, signal } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
// import { StoreModule } from "@ngrx/store";
// import { AUTH_STATE } from "../constants";
// import { authReducer } from "./states/auth.reducers";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./states/auth.effects";

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent}
]

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        // StoreModule.forFeature(AUTH_STATE, authReducer),
        // EffectsModule.forFeature([AuthEffects])
    ],
    exports: []
})

export class AuthModule{

}