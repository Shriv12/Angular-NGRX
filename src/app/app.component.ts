import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { getErrorMessage, getIsLoading } from './shared/shared.selectors';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/states/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'state-management';

  constructor(private store: Store<AppState>){}

  isLoading$: Observable<boolean>
  errorMessage$: Observable<string>

  ngOnInit(){
    this.isLoading$ = this.store.select(getIsLoading)

    this.errorMessage$ = this.store.select(getErrorMessage)

    this.store.dispatch(autoLogin())
  }
}
