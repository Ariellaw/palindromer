import { Injectable } from "@angular/core";

export enum PalindromSection {
  Left = "left",
  Right = "right",
  Pivot = "pivot-input"
}


@Injectable({
  providedIn: "root"
})
export class ServicesService {
  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  latinLettersRegex = /^[A-Za-z]+$/;
  hebrewLettersRegex = "^[א-ת]+$";
  screenwidth:number;
  completeText:string= "";

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
    this.completeText = text;
  }

}
