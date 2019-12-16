import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  latinLettersRegex = /^[A-Za-z]+$/;
  hebrewLettersRegex = "^[א-ת]+$";

  constructor() { }

  isLetterVerification(character) {
    console.log("services letter verification")
    return (
      character.match(this.latinLettersRegex) ||
      character.match(this.hebrewLettersRegex)
    );
  }
}
