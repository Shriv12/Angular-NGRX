import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServices } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../states/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  apiKey: string = 'AIzaSyBCmRQHJ4xHSeEfrWAgudyAXSVW_2EpsTg'
  loginForm: FormGroup;
  loggedInUser: AuthServices;

  constructor(private authService: AuthServices, 
    private store: Store<AppState>
  ){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onLogin(){
    // console.log(this.loginForm.valid);

    const { email, password} = this.loginForm.value
    // this.authService.login(email, password, true).subscribe((response) => {
    //   console.log('response', response);
    //   this.loggedInUser = response
      
    // })

    this.store.dispatch(loginStart({email, password}))

    
  }
  showEmailValidationError(){
    const emailControl = this.loginForm.get('email')
    if(emailControl.touched && !emailControl.valid){
      if(emailControl.errors['required']){

        return 'Email ID is a required field'
      }
      else{
        return 'Enter a valid email ID'
      }
    }
    return ''
  }
  showPasswordValidationError(){
    const passwordControl = this.loginForm.get('password')
    if(passwordControl.touched && !passwordControl.valid){
      if(passwordControl.errors['required']){
        return 'Password is a required field'
      }
    }
    return ''
  }
}
function loginState(arg0: { email: any; password: any; }): any {
  throw new Error('Function not implemented.');
}

