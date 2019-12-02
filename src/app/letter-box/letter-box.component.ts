import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
// import {InputEvent} from '@types/dom-inputevent';

@Component({
  selector: "app-letter-box",
  templateUrl: "./letter-box.component.html",
  styleUrls: ["./letter-box.component.scss"]
})
export class LetterBoxComponent implements OnInit {
  @Input() character: string="";
  @Input() side: string = "";
  @Input() index: number; //TODO: should a letterbox be aware of its index? maybe there's another solution?
  @Output() characterChanged = new EventEmitter<{
    character: string;
    letterIndex: number;
  }>();
  @Output() backspace = new EventEmitter<{ letterIndex: number }>();
  @Output() moveFocus = new EventEmitter<{ keyCode: number }>();
  @Output() characterAdded = new EventEmitter<{
    character: string;
    letterIndex: number;
  }>();
  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  lettersRegex = /^[A-Za-z]+$/;
  constructor() {}

  ngOnInit() {
    // console.log("letterbox init test", this.character, this.side, this.index);
    // this.character = "x";
  }

  handleKeyup(event: any) {
    var currText  =  event.target.innerText;
    var newChar = event.key;


    console.log("letterBoxhandleKeyup event", event,"new Char", newChar, "current text", currText);
    event.preventDefault();

    if (event.keyCode === 37 || event.keyCode === 39) {
      this.moveFocus.emit({ keyCode: event.keyCode });
    } else if (event.key === "Backspace") {
      this.backspace.emit({
        letterIndex: this.index
      });
    } else if(newChar.match(this.lettersRegex) ){
      this.characterAdded.emit({
        character: newChar,
        letterIndex: this.index
      });

    }else {
      console.log("nothing");
      return;
    }
  }

}
      //TODO: read about preventDefault()
      //TODO: https://stackoverflow.com/questions/35105374/how-to-force-a-components-re-rendering-in-angular-2
      // console.log("firstLetter", this.character, typeof this.character)
      //TODO - move focus after backspace -to the previos element
      //fix CSS
      //support for punctation and spaces
      // add to github pages