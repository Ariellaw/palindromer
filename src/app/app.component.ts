import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'palindromer';
  isRightToLeft: boolean;

  ngOnInit() {
    this.isRightToLeft = false;
  }

  ngOnChanges(event){
    console.log("changes", event, "isRightToLeft", this.isRightToLeft)
  }
  changeScreenDirection(event){
    console.log("changeScreenDirection", event);
    this.isRightToLeft = event.isRightToLeft;
  }
}
