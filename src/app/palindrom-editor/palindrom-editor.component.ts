import { Component, OnInit } from "@angular/core";
import { HtmlAstPath } from "@angular/compiler";

@Component({
  selector: "app-palindrom-editor",
  templateUrl: "./palindrom-editor.component.html",
  styleUrls: ["./palindrom-editor.component.scss"]
})
export class PalindromEditorComponent implements OnInit {
  lettersLeft = [];
  lettersRight = [];
  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  latinLettersRegex = /^[A-Za-z]+$/;
  hebrewLettersRegex = "^[א-ת]+$";
  pivotElement: HTMLElement;
  letterBoxElement = "APP-LETTER-BOX";
  pivotElementNodeName = "APP-PIVOT-LETTER";
  constructor() {}
  // באב. ליל באב.
  ngOnInit() {
    this.pivotElement = document.getElementById("pivot-input") as HTMLElement;
    this.pivotElement.focus();
  }

  isLetterVerification(character) {
    return (
      character.match(this.latinLettersRegex) ||
      character.match(this.hebrewLettersRegex)
    );
  }
  moveFocus($event: { keyCode: number }) {
    if ($event.keyCode === 39) {
      this.moveFocusRight();
    } else {
      this.moveFocusLeft();
    }
  }
  deleteLastLetterLeft() {
    let character = this.lettersLeft[this.lettersLeft.length - 1];
    if (this.lettersLeft.length > 0) {
      this.onBackspaceLeft({
        letterIndex: this.lettersLeft.length - 1,
        character
      });
    }
  }
  deleteLastLetterRight() {
    let character = this.lettersRight[0];
    if (this.lettersRight.length > 0) {
      this.onBackspaceRight({ letterIndex: 0, character });
    }
    this.pivotElement.focus();
  }
  moveFocusRight() {
    var focusedElement = window.document.activeElement;
    var nextElement = focusedElement.parentNode.nextSibling;

    if (nextElement) {
      if (
        this.nextElementIsLetterBox(
          focusedElement.parentNode,
          this.letterBoxElement
        ) ||
        this.nextElementIsLetterBox(
          focusedElement.parentNode,
          this.pivotElementNodeName
        )
      ) {
        this.focusOnElement(nextElement);
      } else if (nextElement.nextSibling) {
        if (
          this.nextElementIsLetterBox(nextElement, this.letterBoxElement) ||
          this.nextElementIsLetterBox(nextElement, this.pivotElementNodeName)
        ) {
          this.focusOnElement(nextElement.nextSibling);
        }
      }
    } else {
      return;
    }
  }
  moveFocusLeft() {
    var focusedElement = window.document.activeElement;
    var previousElement = focusedElement.parentNode.previousSibling;

    if (previousElement) {
      if (
        this.previousElementIsLetterBox(
          focusedElement.parentNode,
          this.letterBoxElement
        ) ||
        this.previousElementIsLetterBox(
          focusedElement.parentNode,
          this.pivotElementNodeName
        )
      ) {
        this.focusOnElement(previousElement);
      } else if (previousElement.previousSibling) {
        if (
          this.previousElementIsLetterBox(
            previousElement,
            this.letterBoxElement
          ) ||
          this.previousElementIsLetterBox(
            previousElement,
            this.pivotElementNodeName
          )
        ) {
          this.focusOnElement(previousElement.previousSibling);
        }
      }
    } else {
      return;
    }
  }
  onPivotChanged($event: { newLetter: string }) {
    var character = $event.newLetter;
    this.addOrDeleteCharacter(
      this.lettersLeft,
      this.lettersRight,
      character,
      this.lettersLeft.length,
      0,false
    );
  }

  onLetterInputRight($event: { character: string; letterIndex: number }) {
    let rightIdx = $event.letterIndex;
    let leftIdx = this.lettersRight.length - 1 - rightIdx;
    let character = $event.character;

    this.addOrDeleteCharacter(
      this.lettersLeft,
      this.lettersRight,
      character,
      leftIdx,
      rightIdx, false
    );
  }
  onLetterInputLeft($event: { character: string; letterIndex: number }) {
    let leftIdx = $event.letterIndex;
    let rightIdx = this.lettersRight.length - 1 - leftIdx;
    let character = $event.character;
    this.addOrDeleteCharacter(
      this.lettersRight,
      this.lettersLeft,
      character,
      rightIdx,
      leftIdx, false
    );
  }
  onCharacterAddedRight($event: { character: string; letterIndex: number }) {
    let rightIdx = $event.letterIndex;
    let leftIdx = this.lettersRight.length - 1 - rightIdx;
    let character = $event.character;

    this.addOrDeleteCharacter(
      this.lettersLeft,
      this.lettersRight,
      character,
      leftIdx,
      rightIdx+1, false
    );
  }
  onCharacterAddedLeft($event: { character: string; letterIndex: number }) {
    let leftIdx = $event.letterIndex;
    let rightIdx = this.lettersRight.length - 1 - leftIdx;
    let character = $event.character;
    this.addOrDeleteCharacter(
      this.lettersRight,
      this.lettersLeft,
      character,
      rightIdx,
      leftIdx + 1, false
    );
  }

  onBackspaceLeft($event: { letterIndex: number; character: string }) {

    this.moveFocusOnDelete($event.letterIndex);

    let leftIdx = $event.letterIndex;
    let deletedLetter = $event.character;
    var isLetter = this.isLetterVerification(deletedLetter);

    if (isLetter) {
      var letterIdx = this.getLetterFrequency(
        leftIdx,
        deletedLetter,
        this.lettersLeft
      );

      var rightIdx = this.findIndexOnOppositeSide(
        this.lettersRight,
        deletedLetter,
        letterIdx
      );
    }
    this.addOrDeleteCharacter(this.lettersRight, this.lettersLeft, null, rightIdx, leftIdx, true) 
  }
  onBackspaceRight($event: { letterIndex: number; character: string }) {
    this.moveFocusOnDelete($event.letterIndex)

    let rightIdx = $event.letterIndex;
    let deletedLetter = $event.character;
    var isLetter = this.isLetterVerification(deletedLetter);

    if (isLetter) {
      var letterIdx = this.getLetterFrequency(
        rightIdx,
        deletedLetter,
        this.lettersRight
      );

      var leftIdx = this.findIndexOnOppositeSide(
        this.lettersLeft,
        deletedLetter,
        letterIdx
      );
    }
    this.addOrDeleteCharacter(this.lettersRight, this.lettersLeft, null, rightIdx, leftIdx, true) 
  }


  nextElementIsLetterBox(currElement, nodeName) {
    var nextElement = currElement.nextSibling;
    var element =
      nextElement && nextElement.nodeName === nodeName ? nextElement : null;
    return element;
  }

  previousElementIsLetterBox(currElement, nodeName) {
    var previousElement = currElement.previousSibling;
    var element =
      previousElement && previousElement.nodeName === nodeName
        ? previousElement
        : null;
    return element;
  }

  addOrDeleteCharacter(arr1, arr2, newChar, idx1, idx2, toDelete) {
    if(newChar){
      var isLetter = this.isLetterVerification(newChar);
    }
    if (isLetter || toDelete) {
      !toDelete ?arr1.splice(idx1, 0, newChar):arr1.splice(idx1, 1);
    }
    !toDelete ?arr2.splice(idx2, 0, newChar):arr2.splice(idx2, 1);
  }

  focusOnElement(element) {
    var activeElement = element.childNodes[0] as HTMLElement;
    activeElement.focus();
  }
  getLetterFrequency(idx, letter, lettersArr) {
    let letterIdx = 0;
    for (var i = 0; i <= idx; i++) {
      if (lettersArr[i] === letter) {
        letterIdx++;
      }
    }
    return letterIdx;
  }

  findIndexOnOppositeSide(lettersArr, letter, letterIdx) {
    for (var i = lettersArr.length - 1; i >= 0; i--) {
      if (lettersArr[i] === letter && letterIdx > 1) {
        letterIdx--;
      } else if (lettersArr[i] === letter && letterIdx === 1) {
        return i;
      }
    }
  }
   
  moveFocusOnDelete(letterIndex){
    var focusedElement = window.document.activeElement;
    var previousElement = this.previousElementIsLetterBox(
      focusedElement.parentNode,
      this.letterBoxElement
    );
    var nextElement = this.nextElementIsLetterBox(
      focusedElement.parentNode,
      this.letterBoxElement
    );
    if (letterIndex === this.lettersLeft.length - 1) {
      this.pivotElement.focus();
    } else if (previousElement) {
      this.focusOnElement(previousElement);
    } else if (nextElement) {
      this.focusOnElement(nextElement);
    } else {
      this.pivotElement.focus();
    }
  }

}
