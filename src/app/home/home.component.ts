import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  value: string = ''
  stringArr: string[] = ['a', 'b', 'c']
  choice: any =''

  showSelect(event: any){
    console.log(event.target.value, 'event');
    this.value = event.target.value
    
  }
  ngOnInit(){
    console.log('cjoice', this.choice);
    
  }
}
