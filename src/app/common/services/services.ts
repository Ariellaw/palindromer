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


  setCompleteText(text){
    this.completeText = text;
  }

}
