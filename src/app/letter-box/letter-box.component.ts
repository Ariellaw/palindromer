import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-letter-box",
  templateUrl: "./letter-box.component.html",
  styleUrls: ["./letter-box.component.scss"]
})
export class LetterBoxComponent implements OnInit {
  id;
  @Input() letter: string = "h";
  @Input() side: string = "";
  @Input() index: number; //TODO: should a letterbox be aware of its index? maybe there's another solution?
  @Output() letterAdded = new EventEmitter<{newLetter:string; letterIndex: number;}>();
  @Output() backspace = new EventEmitter<{ letterIndex: number }>();
  @Output() moveFocus = new EventEmitter<{ keyCode:number}>();
  @Output() newLetter = new EventEmitter<{
    newLetter: string;
    letterIndex: number;
  }>();
  constructor() {}

  ngOnInit() {
    console.log("test", this.letter, this.side, this.index)
  }

  onUserInput(event: any) {
    event.preventDefault();
    var lettersRegex = /^[A-Za-z]+$/;
    // console.log("newLetter", this.letter,"event", event, event.keyCode);
    
    if(event.keyCode===37 || event.keyCode===39){
      this.moveFocus.emit({keyCode:event.keyCode});
    }
    else if (this.letter.length === 1 && this.letter.match(lettersRegex)) {
      this.newLetter.emit({ newLetter: this.letter, letterIndex: this.index });
    } else if(this.letter.length === 2 ){ 
      this.letterAdded.emit({ newLetter: this.letter[1], letterIndex: this.index });
      this.letter = this.letter[0];
    } else if (event.key === "Backspace") {
      this.backspace.emit({
        letterIndex: this.index
      });
    }
  }
}

/*
Backspaces
punctionation
spaces
letters - letterChanged - letter
*/
