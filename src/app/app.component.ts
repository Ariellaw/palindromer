import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'palindromer';
  isRightToLeft ="true";


  changeScreenDirection(event){
    this.isRightToLeft = event.isRightToLeft;
  }
  ngOnChanges(event){
    console.log("changes", event, "isRightToLeft", this.isRightToLeft)
  }
}
