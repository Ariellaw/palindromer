import { Component, OnInit } from "@angular/core";
import { HtmlAstPath } from "@angular/compiler";

@Component({
  selector: "app-palindrom-editor",
  templateUrl: "./palindrom-editor.component.html",
  styleUrls: ["./palindrom-editor.component.scss"]
})
export class PalindromEditorComponent implements OnInit {
  lettersLeft = ["a", "b"];
  lettersRight = ["b", "a"];
  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  lettersRegex = /^[A-Za-z]+$/;
  pivotElement: HTMLElement;

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

  moveFocus($event: { keyCode: number }) {
    console.log("moveFocus");
    var code = $event.keyCode;
    var nextLetterBox;
    var previousLetterBox;
    var focusedElement = window.document.activeElement;
    var nextElement = focusedElement.parentNode.nextSibling;
    var previousElement = focusedElement.parentNode.previousSibling;

    if (nextElement && code === 39) {
      if (
        nextElement.nodeName !== "APP-LETTER-BOX" &&
        nextElement.nodeName !== "APP-PIVOT-LETTER"
      ) {
        nextLetterBox = nextElement.nextSibling.childNodes[0] as HTMLElement;
      } else {
        nextLetterBox = nextElement.childNodes[0] as HTMLElement;
      }
      nextLetterBox.focus();
    } else if (previousElement && code === 37) {
      if (
        previousElement.nodeName !== "APP-LETTER-BOX" &&
        previousElement.nodeName !== "APP-PIVOT-LETTER"
      ) {
        if (
          (previousElement.previousSibling &&
            previousElement.previousSibling.nodeName === "APP-LETTER-BOX") ||
          (previousElement.previousSibling &&
            previousElement.previousSibling.nodeName === "APP-PIVOT-LETTER")
        ) {
          previousLetterBox = previousElement.previousSibling
            .childNodes[0] as HTMLElement;
        } else {
          return;
        }
      } else if (previousElement.childNodes[0]) {
        previousLetterBox = previousElement.childNodes[0] as HTMLElement;
      } else {
        return;
      }
      previousLetterBox.focus();
    }
  }
  onPivotChanged($letter: { newLetter: string }) {
    this.lettersLeft.push($letter.newLetter);
    this.lettersRight.unshift($letter.newLetter);
  }

  onLetterInputRight($event: { character: string; letterIndex: number }) {
    console.log("onLetterInputRight");

    let rightIdx = $event.letterIndex;
    let leftIdx = this.lettersRight.length - 1 - rightIdx;
    let character = $event.character;

    if (character.match(this.lettersRegex)) {
      this.lettersLeft[leftIdx] = character;
      this.lettersRight[rightIdx] = character;
    } else if (character.match(this.punctionationRegex)) {
      this.lettersLeft[leftIdx] = "";
      this.lettersRight[rightIdx] = character;
    }
  }
  onLetterInputLeft($event: { character: string; letterIndex: number }) {
    console.log("onLetterInputLeft");

    let leftIdx = $event.letterIndex;
    let rightIdx = this.lettersRight.length - 1 - leftIdx;
    let character = $event.character;
    if (character.match(this.lettersRegex)) {
      this.lettersLeft[leftIdx] = character;
      this.lettersRight[rightIdx] = character;
    } else if (character.match(this.punctionationRegex)) {
      this.lettersLeft[leftIdx] = character;
      this.lettersRight[rightIdx] = "";
    }
  }
  onCharacterAddedRight($event: { character: string; letterIndex: number }) {
    console.log("onCharacterAddedRight");
    let rightIdx = $event.letterIndex;
    let leftIdx = this.lettersRight.length - 1 - rightIdx;
    let character = $event.character;

    if (character.match(this.lettersRegex)) {
      this.lettersLeft.splice(leftIdx, 0, $event.character);
      this.lettersRight.splice(rightIdx + 1, 0, $event.character);
    } else if (character.match(this.punctionationRegex)) {
      this.lettersRight.splice(rightIdx + 1, 0, $event.character);
    }
  }
  onCharacterAddedLeft($event: { character: string; letterIndex: number }) {
    console.log("onCharacterAddedLeft");
    let leftIdx = $event.letterIndex;
    let rightIdx = this.lettersRight.length - 1 - leftIdx;
    let character = $event.character;

    if (character.match(this.lettersRegex)) {
      this.lettersLeft.splice(leftIdx + 1, 0, character);
      this.lettersRight.splice(rightIdx, 0, character);
    } else if (character.match(this.punctionationRegex)) {
      this.lettersLeft.splice(leftIdx + 1, 0, character);
    }
  }

  onBackspaceLeft($event: { letterIndex: number; character: string }) {
    var focusedElement = window.document.activeElement;
    var nextElement = focusedElement.parentNode.nextSibling;
    var previousElement = focusedElement.parentNode.previousSibling;

    if (
      previousElement.nodeName === "APP-LETTER-BOX" &&
      previousElement.childNodes[0]
    ) {
      var previousLetterBox = previousElement.childNodes[0] as HTMLElement;
      previousLetterBox.focus();
    } else if (
      nextElement.nodeName === "APP-LETTER-BOX" &&
      nextElement.childNodes[0]
    ) {
      var nextLetterBox = nextElement.childNodes[0] as HTMLElement;
      nextLetterBox.focus();
    } else {
      this.pivotElement.focus();
    }

    let leftIdx = $event.letterIndex;
    let deletedLetter = $event.character;
    let actualLetterIdx = 0;

    if (deletedLetter.match(this.lettersRegex)) {
      for (var i = 0; i <= leftIdx; i++) {
        if (this.lettersLeft[i] === deletedLetter) {
          actualLetterIdx++;
        }
      }
      for (var i = this.lettersRight.length - 1; i >= 0; i--) {
        if (this.lettersRight[i] === deletedLetter && actualLetterIdx > 1) {
          actualLetterIdx--;
        } else if (
          this.lettersRight[i] === deletedLetter &&
          actualLetterIdx === 1
        ) {
          this.lettersRight.splice(i, 1);
          break;
        }
      }
    }
    this.lettersLeft.splice(leftIdx, 1);
  }
  onBackspaceRight($event: { letterIndex: number; character: string }) {
    var focusedElement = window.document.activeElement;
    var nextElement = focusedElement.parentNode.nextSibling;
    var previousElement = focusedElement.parentNode.previousSibling;

    if (
      previousElement.nodeName === "APP-LETTER-BOX" &&
      previousElement.childNodes[0]
    ) {
      var previousLetterBox = previousElement.childNodes[0] as HTMLElement;
      previousLetterBox.focus();
    } else if (
      nextElement &&
      nextElement.nodeName === "APP-LETTER-BOX" &&
      nextElement.childNodes[0]
    ) {
      var nextLetterBox = nextElement.childNodes[0] as HTMLElement;
      nextLetterBox.focus();
    } else {
      this.pivotElement.focus();
    }

    let rightIdx = $event.letterIndex;
    let deletedLetter = $event.character;
    let actualLetterIdx = 0;

    if (deletedLetter.match(this.lettersRegex)) {
      for (var i = 0; i <= rightIdx; i++) {
        if (this.lettersRight[i] === deletedLetter) {
          actualLetterIdx++;
        }
      }
      for (var i = this.lettersLeft.length - 1; i >= 0; i--) {
        if (this.lettersLeft[i] === deletedLetter && actualLetterIdx > 1) {
          actualLetterIdx--;
        } else if (
          this.lettersLeft[i] === deletedLetter &&
          actualLetterIdx === 1
        ) {
          this.lettersLeft.splice(i, 1);
          break;
        }
      }
    }
    this.lettersRight.splice(rightIdx, 1);
  }
}
