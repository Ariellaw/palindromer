import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-letter-box",
  templateUrl: "./letter-box.component.html",
  styleUrls: ["./letter-box.component.scss"]
})
export class LetterBoxComponent implements OnInit {
  @Input() letter: string = "h";
  @Input() side: string = "";
  @Input() index: number; //TODO: should a letterbox be aware of its index? maybe there's another solution?
  @Output() letterAdded = new EventEmitter<{newLetter:string; letterIndex: number;}>();
  @Output() backspace = new EventEmitter<{ letterIndex: number }>();
  @Output() newLetter = new EventEmitter<{
    newLetter: string;
    letterIndex: number;
  }>();
  constructor() {}

  ngOnInit() {
    
  }

  onUserInput(event: any) {
    event.preventDefault();
    var lettersRegex = /^[A-Za-z]+$/;
    // console.log("newLetter", this.letter,"event", event, event.keyCode);
    
    if(event.keyCode===37 || event.keyCode===39){
         //TODO  - move to parent component
      var focusedElement = window.document.activeElement;
      var nextElement = focusedElement.parentNode.nextSibling.childNodes[0] as HTMLElement;
      nextElement.focus();
     var attributes = focusedElement.hasAttributes();
      console.log(nextElement,"attributes", attributes)
      // nextElement.focus();
      // document.getElementById("left2").focus();

   
      var letterboxes = document.getElementsByClassName("letter-box");
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
