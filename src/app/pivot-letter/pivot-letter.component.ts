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
  constructor() {}

  ngOnInit() {}

  onUserInput(event: KeyboardEvent) {
    var lettersRegex = /^[A-Za-z]+$/;
    var isOneCharacter = this.input.length===1;

    if(isOneCharacter){
      event.preventDefault();
      return;
    }
    // else if(event.key === "Backspace"){
    //   this.backspace.emit();
    // }
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
