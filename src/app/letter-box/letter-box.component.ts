import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
// import { type } from 'os';
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
  @Output() moveFocus = new EventEmitter<{ keyCode: number, side:string, letterIdx:number }>();
  @Output() characterAdded = new EventEmitter<{
    character: string;
    letterIndex: number;
  }>();
  @Output() delete = new EventEmitter<{letterIndex: number; character: string;}>();

  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  latinLettersRegex = /^[A-Za-z]+$/;
  hebrewLettersRegex = "^[א-ת]+$";
  typeOfChar: string = "letter";

  constructor() {}

  ngOnInit() {
    this.assignCharacterType();
  }
  isLetterVerification1(character) {
    return (
      character.match(this.latinLettersRegex) ||
      character.match(this.hebrewLettersRegex)
    );
  }

  handleKeyup(event: KeyboardEvent) {
    event.preventDefault();
    // var currText = event.target.innerText;
    var newChar = event.key;

    if (event.keyCode === 37 || event.keyCode === 39) {
      this.moveFocus.emit({ keyCode: event.keyCode, side:this.side, letterIdx:this.index });
    } else if (event.keyCode === 8) {
      this.backspace.emit({
        letterIndex: this.index,
        character: this.character
      });
    }else if(event.keyCode === 46){
      this.delete.emit({
        letterIndex: this.index,
        character: this.character
      });
    } else if (newChar.length > 1) {
      return;
    } else {
      this.assignCharacterType();
      this.characterAdded.emit({
        character: newChar,
        letterIndex: this.index
      });
    }
  }

  assignCharacterType() {
    var isLetter = this.isLetterVerification1(this.character);
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
