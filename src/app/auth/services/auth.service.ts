import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/models/auth-response.model';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { logout } from '../states/auth.actions';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  constructor(private http: HttpClient,
    private store: Store<AppState>
  ) {}

  timer: any;

  login(email: string, password: string): Observable<AuthResponse> {
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    // console.log(apiUrl);

    return this.http.post<AuthResponse>(apiUrl, body);
  }

  signup(email: string, password): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http.post<AuthResponse>(url, body);
  }

  getErrorMessage(errorMessage: HttpErrorResponse) {
    let message = 'An unknown error has occurred';

    if (!errorMessage.error || !errorMessage.error.error) {
      return message;
    }

    switch (errorMessage.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        message = 'The email or passowrd is incorrect';
        break;
      case 'EMAIL_EXISTS':
        message = 'The email already exists';
        break;
      default:
        message = errorMessage.error.error.message;
    }

    return message;
  }

  formatuserData(response: AuthResponse) {
    const expireTime = Date.now() + +response.expiresIn * 1000;
    const formattedUser: User = {
      accessToken: response.idToken,
      email: response.email,
      expiresIn: expireTime,
      userId: response.localId,
    };
    return formattedUser;
  }

  saveUserInLocalStorage(user: User) {
    try {
        // converting js obj to string
      localStorage.setItem('loggedUser', JSON.stringify(user));
      this.autoLogoutUser(user);
    } catch (error) {
      console.log('Error saving user data to localstorage', error);
    }
  }

  readUserFromLocalStorage() {
    try {
      const loggedUser = localStorage.getItem('loggedUser');

      if (!loggedUser) {
        return null;
      }
      // converting string to js obj
      const user: User = JSON.parse(loggedUser)

      // checking whether the token in expired or not
      if(user.expiresIn <= Date.now()){
        localStorage.removeItem('loggedUser')
        return null
      }

      return user;
    } catch (error) {
        localStorage.removeItem('loggedUser')
        return null
    }
  }

  logout(){
    localStorage.removeItem('loggedUser')
    if(this.timer){
      clearTimeout(this.timer);
      this.timer = null
    }
  }

  autoLogoutUser(user: User){
    const interval = user.expiresIn - Date.now()
    this.timer = setTimeout(() => {
      this.store.dispatch(logout())
    }, interval)
  }
}

