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


  constructor() {}

  isLetterVerification(character) {
    return (
      character.match(this.latinLettersRegex) ||
      character.match(this.hebrewLettersRegex)
    );
  }

  getScreenWidth(){
    this.screenwidth=window.innerWidth;
    return window.innerWidth;
  }
  

}
