import { Component, OnInit } from "@angular/core";
import { HtmlAstPath } from "@angular/compiler";

@Component({
  selector: "app-palindrom-editor",
  templateUrl: "./palindrom-editor.component.html",
  styleUrls: ["./palindrom-editor.component.scss"]
})
export class PalindromEditorComponent implements OnInit {
  lettersLeft = ["t", "a", "c"];
  lettersRight = ["c", "a", "t"];
  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  latinLettersRegex = /^[A-Za-z]+$/;
  hebrewLettersRegex = "^[א-ת]+$";
  pivotElement: HTMLElement;
  letterBoxElement = "APP-LETTER-BOX";
  pivotElementNodeName = "APP-PIVOT-LETTER";

  constructor() {}

  ngOnInit() {
    this.pivotElement = document.getElementById("pivot-input") as HTMLElement;
    this.pivotElement.focus();
  }
  //TODO - move to another file
  //   isTextSelected(input) {
  //     if (typeof input.selectionStart === "number") {
  //         return input.selectionStart === 0 && input.selectionEnd === input.value.length;
  //     } else if (typeof DOCUMENT.selection !== "undefined") {
  //         input.focus();
  //         return DOCUMENT.selection.createRange().text === input.value;
  //     }
  // }
  isLetterVerification(character){
    return character.match(this.latinLettersRegex) || character.match(this.hebrewLettersRegex);
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
    var character =  $event.newLetter;
    var isLetter = this.isLetterVerification(character);
    if (isLetter) {
      this.lettersLeft.push(character);
      this.lettersRight.unshift(character);
    } else {
      this.lettersRight.unshift(character);
    }
  }

  onLetterInputRight($event: { character: string; letterIndex: number }) {
    let rightIdx = $event.letterIndex;
    let leftIdx = this.lettersRight.length - 1 - rightIdx;
    let character = $event.character;
    var isLetter = this.isLetterVerification(character)

    if (isLetter) {
      this.lettersLeft[leftIdx] = character;
      this.lettersRight[rightIdx] = character;
    } else  {
      // this.lettersLeft[leftIdx] = "";
      this.lettersRight[rightIdx] = character;
    }
  }
  onLetterInputLeft($event: { character: string; letterIndex: number }) {
    let leftIdx = $event.letterIndex;
    let rightIdx = this.lettersRight.length - 1 - leftIdx;
    let character = $event.character;
    var isLetter = this.isLetterVerification(character)

    if (isLetter) {
      this.lettersLeft[leftIdx] = character;
      this.lettersRight[rightIdx] = character;
    } else {
      this.lettersLeft[leftIdx] = character;
      // this.lettersRight[rightIdx] = "";
    }
  }
  onCharacterAddedRight($event: { character: string; letterIndex: number }) {
    let rightIdx = $event.letterIndex;
    let leftIdx = this.lettersRight.length - 1 - rightIdx;
    let character = $event.character;
    var isLetter = this.isLetterVerification(character);

    if (isLetter) {
      this.lettersLeft.splice(leftIdx, 0, $event.character);
      this.lettersRight.splice(rightIdx + 1, 0, $event.character);
    } else {
      this.lettersRight.splice(rightIdx + 1, 0, $event.character);
    }
  }
  onCharacterAddedLeft($event: { character: string; letterIndex: number }) {
    let leftIdx = $event.letterIndex;
    let rightIdx = this.lettersRight.length - 1 - leftIdx;
    let character = $event.character;
    var isLetter = this.isLetterVerification(character);

    if (isLetter) {
      this.lettersLeft.splice(leftIdx + 1, 0, character);
      this.lettersRight.splice(rightIdx, 0, character);
    } else{
      this.lettersLeft.splice(leftIdx + 1, 0, character);
    }
  }

  onBackspaceLeft($event: { letterIndex: number; character: string }) {
    var focusedElement = window.document.activeElement;
    var previousElement = this.previousElementIsLetterBox(
      focusedElement.parentNode,
      this.letterBoxElement
    );
    var nextElement = this.nextElementIsLetterBox(
      focusedElement.parentNode,
      this.letterBoxElement
    );
    if ($event.letterIndex === this.lettersLeft.length - 1) {
      this.pivotElement.focus();
    } else if (previousElement) {
      this.focusOnElement(previousElement);
    } else if (nextElement) {
      this.focusOnElement(nextElement);
    } else {
      this.pivotElement.focus();
    }

    let leftIdx = $event.letterIndex;
    let deletedLetter = $event.character;
    var isLetter = this.isLetterVerification(deletedLetter);

    if (isLetter) {
      var letterIdx = this.getLetterFrequency(
        leftIdx,
        deletedLetter,
        this.lettersLeft
      );

      var letterToDelete = this.findIndexOnOppositeSide(
        this.lettersRight,
        deletedLetter,
        letterIdx
      );
      this.lettersRight.splice(letterToDelete, 1);
    }
    this.lettersLeft.splice(leftIdx, 1);
  }
  onBackspaceRight($event: { letterIndex: number; character: string }) {
    var focusedElement = window.document.activeElement;
    var previousElement = this.previousElementIsLetterBox(
      focusedElement.parentNode,
      this.letterBoxElement
    );
    var nextElement = this.nextElementIsLetterBox(
      focusedElement.parentNode,
      this.letterBoxElement
    );

    if ($event.letterIndex === 0) {
      this.pivotElement.focus();
    } else if (previousElement) {
      this.focusOnElement(previousElement);
    } else if (nextElement) {
      this.focusOnElement(nextElement);
    } else {
      this.pivotElement.focus();
    }

    let rightIdx = $event.letterIndex;
    let deletedLetter = $event.character;
    var isLetter = this.isLetterVerification(deletedLetter);


    if (isLetter) {
      var letterIdx = this.getLetterFrequency(
        rightIdx,
        deletedLetter,
        this.lettersRight
      );

      var letterToDelete = this.findIndexOnOppositeSide(
        this.lettersLeft,
        deletedLetter,
        letterIdx
      );
      this.lettersLeft.splice(letterToDelete, 1);
    }
    this.lettersRight.splice(rightIdx, 1);
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
}
