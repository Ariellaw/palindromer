import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
// import {InputEvent} from '@types/dom-inputevent';

@Component({
  selector: "app-letter-box",
  templateUrl: "./letter-box.component.html",
  styleUrls: ["./letter-box.component.scss"]
})
export class LetterBoxComponent implements OnInit {
  @Input() character: string = "";
  @Input() side: string = "";
  @Input() index: number; //TODO: should a letterbox be aware of its index? maybe there's another solution?
  @Output() characterChanged = new EventEmitter<{
    character: string;
    letterIndex: number;
  }>();
  @Output() backspace = new EventEmitter<{
    letterIndex: number;
    character: string;
  }>();
  @Output() moveFocus = new EventEmitter<{ keyCode: number }>();
  @Output() characterAdded = new EventEmitter<{
    character: string;
    letterIndex: number;
  }>();
  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  lettersRegex = /^[A-Za-z]+$/;
  typeOfChar: string = "letter";

  constructor() {}

  ngOnInit() {
    console.log("this.character", this.character)
    this.assignCharacterType();
  }

  handleKeyup(event: any) {
    var currText = event.target.innerText;
    var newChar = event.key;

    event.preventDefault();
    if (newChar === "Shift") {
      return;
    } else if (event.keyCode === 37 || event.keyCode === 39) {
      this.moveFocus.emit({ keyCode: event.keyCode });
    } else if (event.key === "Backspace") {
      this.backspace.emit({
        letterIndex: this.index,
        character: this.character
      });
    } else if (
      (newChar.match(this.lettersRegex) && newChar.length === 1) ||
      (newChar.match(this.punctionationRegex) && newChar.length === 1) ||
      newChar === " "
    ) {
      this.assignCharacterType();
      this.characterAdded.emit({
        character: newChar,
        letterIndex: this.index
      });
    } else {
      return;
    }
  }

  assignCharacterType() {
    if (this.character.match(this.lettersRegex)) {
      this.typeOfChar = "letter";
    } else if (this.character === " ") {
      this.typeOfChar = "space";
    } else {
      this.typeOfChar = "punctuation";
    }
    console.log(" this.typeOfChar",  this.typeOfChar)
  }
}
//TODO: read about preventDefault()
//TODO: https://stackoverflow.com/questions/35105374/how-to-force-a-components-re-rendering-in-angular-2
//fix CSS
//support for punctation and spaces
//Support for deleting puncuation
//collapse pivot:
// add to github pages
