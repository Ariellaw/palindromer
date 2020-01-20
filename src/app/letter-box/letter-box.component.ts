import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { ServicesService } from "../common/services/services";
import { PalindromSection } from "../common/services/services";

enum charTypes {
  Letter = "letter",
  Punctuation = "punctuation",
  Space = "space"
}

@Component({
  selector: "app-letter-box",
  templateUrl: "./letter-box.component.html",
  styleUrls: ["./letter-box.component.scss"]
})
export class LetterBoxComponent implements OnInit {
  currChar: string = "";
  typeOfChar: charTypes = charTypes.Letter;
  @Input() character: string = "";
  @Input() side: string = "";
  @Input() index: number; //TODO: should a letterbox be aware of its index? maybe there's another solution?
  @Output() characterChanged = new EventEmitter<{
    prevChar: string;
    newChar: string;
    letterIdx: number;
  }>();
  @Output() backspace = new EventEmitter<{
    letterIdx: number;
    character: string;
  }>();
  @Output() newUserInput = new EventEmitter<{ newLetter: string }>();
  @Output() moveFocus = new EventEmitter<{
    keyCode: number;
    side: string;
    letterIdx: number;
  }>();
  @Output() characterAdded = new EventEmitter<{
    newChar: string;
    oldChar: string;
    idx: number;
  }>();
  @Output() delete = new EventEmitter<{
    letterIdx: number;
    character: string;
  }>();
  @Output() replaceLetter = new EventEmitter<{
    newChar: string;
    letterIdx: number;
    side: string;
  }>();
  @Output() deletePreviousChar = new EventEmitter<{
    letterIdx: number;
    side: string;
  }>();
  @Output() deleteNextChar = new EventEmitter<{
    letterIdx: number;
    side: string;
  }>();
  constructor(private services: ServicesService) {}

  ngOnInit() {
    this.assignCharacterType();
    this.currChar = this.character;
    if (this.side === "left") {
      this.side = PalindromSection.Left;
    } else this.side = PalindromSection.Right;
  }

  //
  handleKeyup(event: KeyboardEvent) {
    let currEl = event.target as HTMLInputElement;
    let curserPosition = currEl.selectionStart;
    event.preventDefault();
    this.setCursorPosition(currEl, 1);

    if (event.shiftKey && (event.keyCode === 37 || event.keyCode === 39)) {
      return;
    } else if (event.keyCode === 37 || event.keyCode === 39) {

        this.moveFocus.emit({
          keyCode: event.keyCode,
          side: this.side,
          letterIdx: this.index
        });
      // 8 is backspace
    } else if (event.keyCode === 8) {
      this.onBackSpace(curserPosition, this.side);
    } else if (event.keyCode === 46) {
      this.setCursorPosition(0, currEl);
      this.deleteChar(curserPosition, this.side);
    } else if (
      event.keyCode === 16 ||
      event.keyCode === 20 ||
      event.keyCode === 13 ||
      event.keyCode === 17
    ) {
      return;
    } else if (this.character.length === 2) {

      this.characterAdded.emit({
        newChar: this.character.charAt(1),
        oldChar: this.currChar,
        idx: this.index,
      });
      this.character = this.character.charAt(0);
      this.currChar = this.character.charAt(0);

    } else if (this.character.length === 1) {
      this.characterChanged.emit({
        prevChar: this.currChar,
        newChar: this.character,
        letterIdx: this.index
      });
      this.currChar = this.character;
    }
  }

  assignCharacterType() {
    let isLetter = this.services.isLetterVerification(this.character);
    if (isLetter) {
      this.typeOfChar = charTypes.Letter;
    } else if (this.character === " ") {
      this.typeOfChar = charTypes.Space;
    } else {
      this.typeOfChar = charTypes.Punctuation;
    }
  }

  onBackSpace(curserPosition, side) {
    if (curserPosition === 0 && this.character.length === 0) {
      this.backspace.emit({
        letterIdx: this.index,
        character: this.currChar
      });
    } else if (
      curserPosition === 0 &&
      this.character.length >= 1 &&
      this.index > 0
    ) {
      this.deletePreviousChar.emit({
        letterIdx: this.index - 1,
        side: this.side
      });
    } else if (curserPosition !== 0) {
      this.replaceLetter.emit({
        newChar: this.character,
        letterIdx: this.index,
        side: side
      });
      this.currChar = this.character;
      return;
    }
  }

  deleteChar(curserPosition, side) {
    if (curserPosition === 0 && this.character.length === 0) {
      this.delete.emit({
        letterIdx: this.index,
        character: this.currChar
      });
    } else if (curserPosition === this.character.length) {
      this.deleteNextChar.emit({
        letterIdx: this.index + 1,
        side: this.side
      });
    } else if (this.character.length > 0) {
      this.replaceLetter.emit({
        newChar: this.character,
        letterIdx: this.index,
        side: side
      });
      this.currChar = this.character;
    }
  }

  setCursorPosition(currEl, caretPos) {
    if (currEl.setSelectionRange) {
      currEl.focus();
      currEl.setSelectionRange(caretPos, caretPos);

      // IE8 and below
    } else if (currEl.createTextRange) {
      let range = currEl.createTextRange();
      range.collapse(true);
      range.moveEnd("character", caretPos);
      range.moveStart("character", caretPos);
      range.select();
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
//Add a services page
