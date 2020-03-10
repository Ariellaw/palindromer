import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

export enum PalindromSection {
  Left = "left",
  Right = "right",
  Pivot = "pivot-input"
}


@Injectable({
  providedIn: "root"
})
export class ServicesService {
  textChanged = new Subject<string>();
  directionChanged = new Subject<boolean>()

  isRightToLeft:boolean = false;
  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  latinLettersRegex = /^[A-Za-z]+$/;
  hebrewLettersRegex = "^[א-ת]+$";
  screenwidth:number;
  completeText:string= "yay";

  constructor() {}

  isLetterVerification(character) {
    return (
      character.match(this.latinLettersRegex) ||
      character.match(this.hebrewLettersRegex)
    );
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

  setCompleteText(text){
    console.log("complete text", text)
    this.completeText = text;
    this.textChanged.next(this.completeText);
  }

  setDirection(isRightToLeft){
    console.log("step 2 RTL", isRightToLeft)
    this.isRightToLeft = isRightToLeft;
    this.directionChanged.next(this.isRightToLeft)
  }
}
