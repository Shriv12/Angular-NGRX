import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signupStart } from '../states/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private store: Store<AppState>){}

  ngOnInit(){
    this.signupForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onSignup(){
    console.log(this.signupForm.value);
    const {email, password} = this.signupForm.value
    this.store.dispatch(signupStart({email, password}))
  }

  validateEmail(){
    const emailControl = this.signupForm.get('email')

    if(!emailControl.valid && emailControl.touched){
      if(emailControl.errors['required']){
        return 'Email id is required'
      }
      else if(emailControl.errors['email']){
        return 'Enter a valid email'
      }

    }
    return ''
  }

  validatePassword(){
    const passwordControl = this.signupForm.get('password')

    if(!passwordControl.valid && passwordControl.touched){
      if(passwordControl.errors['required']){
        return 'Password is required'
      }
      else if(passwordControl.errors['email']){
        return 'Enter a valid password'
      }

    }
    return ''
  }
}
