import { Component, Input } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { setErrorMessage } from '../shared/shared.actions';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {
  @Input() errorMessage: string = ''
  constructor(private store: Store<AppState>){}
  ngOnInit(){
    setTimeout(() => {
      this.store.dispatch(setErrorMessage({message: ''}))
    }, 5000)
  }
}
