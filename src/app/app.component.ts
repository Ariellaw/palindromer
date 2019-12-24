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
  }
  changeScreenDirection(event){
    this.isRightToLeft = event.isRightToLeft;
  }
}
