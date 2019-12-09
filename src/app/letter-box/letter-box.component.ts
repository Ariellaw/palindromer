import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { type } from 'os';
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
  latinLettersRegex = /^[A-Za-z]+$/;
  hebrewLettersRegex = "^[א-ת]+$";
  typeOfChar: string = "letter";

  constructor() {}

  ngOnInit() {
    this.assignCharacterType();
  }
  isLetterVerification(character){
    return character.match(this.latinLettersRegex) || character.match(this.hebrewLettersRegex);
  }

  handleKeyup(event: KeyboardEvent) {
    event.preventDefault();
    // var currText = event.target.innerText;
    var newChar = event.key;
    if (newChar === "Shift") {
      return;
    } else if (event.keyCode === 37 || event.keyCode === 39) {
      this.moveFocus.emit({ keyCode: event.keyCode });
    } else if (event.key === "Backspace") {
      this.backspace.emit({
        letterIndex: this.index,
        character: this.character
      });
    } else
    //  if (
    //   (newChar.match(this.latinLettersRegex) && newChar.length === 1) ||
    //   (newChar.match(this.punctionationRegex) && newChar.length === 1) ||
    //   newChar === " "
    // )
     {
      this.assignCharacterType();
      this.characterAdded.emit({
        character: newChar,
        letterIndex: this.index
      });
    } 
  }

  assignCharacterType() {
   var isLetter = this.isLetterVerification(this.character)
    if (isLetter) {
      this.typeOfChar = "letter";
    } else if (this.character === " ") {
      this.typeOfChar = "space";
    } else {
      this.typeOfChar = "punctuation";
    }
  }
}
//TODO: read about preventDefault()
//TODO: https://stackoverflow.com/questions/35105374/how-to-force-a-components-re-rendering-in-angular-2
//fix CSS
//support for punctation and spaces
//Support for deleting puncuation
//collapse pivot:
// add to github pages
