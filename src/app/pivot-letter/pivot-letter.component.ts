import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-pivot-letter",
  templateUrl: "./pivot-letter.component.html",
  styleUrls: ["./pivot-letter.component.scss"]
})
export class PivotLetterComponent implements OnInit {
  input: string = "a";
  @Output() newUserInput = new EventEmitter<{ newLetter: string }>();
  @Output() backspace = new EventEmitter();
  @Output() moveFocus = new EventEmitter<{ keyCode:number}>();
  pivotIsCollapsed = false;
  

  constructor() {}

  ngOnInit() {}

  expand(){
    console.log("expand");
    this.pivotIsCollapsed = false;
  }
  onUserInput(event: KeyboardEvent) {

    this.pivotIsCollapsed = false;
    var lettersRegex = /^[A-Za-z]+$/;
    var isOneCharacter = this.input.length===1;
    if(event.keyCode===37 || event.keyCode===39){
      this.moveFocus.emit({keyCode:event.keyCode});
    }
    else if(event.keyCode ===  8 || event.keyCode === 46){
      this.pivotIsCollapsed = true;
    }   
  else if(isOneCharacter){
      event.preventDefault();
      return;
    }
    else if(this.input.length===2){
      var newCharacter= this.input.charAt(0);
      if(newCharacter.match(lettersRegex)){
        this.newUserInput.emit({
          newLetter:newCharacter
        })
        this.input = this.input.slice(1);
      }
    }
  }
}
