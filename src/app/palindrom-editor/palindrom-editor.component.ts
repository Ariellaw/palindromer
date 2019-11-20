import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-palindrom-editor",
  templateUrl: "./palindrom-editor.component.html",
  styleUrls: ["./palindrom-editor.component.scss"]
})
export class PalindromEditorComponent implements OnInit {
  lettersLeft = ["a", "b","c", "d"];
  lettersRight = ["d", "c", "b", "a"];

  constructor() {}

  ngOnInit() {}
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
    console.log("moveFocus")
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

  onLetterInputRight($event: { newLetter: string; letterIndex: number }) {
    console.log("onLetterInputRight")

    let rightLetterIdx = $event.letterIndex;
    let leftLetterIdx = this.lettersRight.length - 1 - rightLetterIdx;

    this.lettersLeft[leftLetterIdx] = $event.newLetter;
    this.lettersRight[rightLetterIdx] = $event.newLetter;
  }
  onLetterInputLeft($event: { newLetter: string; letterIndex: number }) {
    console.log("onLetterInputLeft")

    let leftLetterIdx = $event.letterIndex;
    let rightLetterIdx = this.lettersRight.length - 1 - leftLetterIdx;

    this.lettersLeft[leftLetterIdx] = $event.newLetter;
    this.lettersRight[rightLetterIdx] = $event.newLetter;
  }
  onLetterAddedRight($event: { newLetter: string; letterIndex: number }) {
    console.log("onLetterAddedRight")

    let rightLetterIdx = $event.letterIndex;
    let leftLetterIdx = this.lettersRight.length - 1 - rightLetterIdx;

    this.lettersLeft.splice(leftLetterIdx, 0, $event.newLetter);
    this.lettersRight.splice(rightLetterIdx + 1, 0, $event.newLetter);
  }
  onLetterAddedLeft($event: { newLetter: string; letterIndex: number }) {
    console.log("onLetterAddedLeft")
    let leftLetterIdx = $event.letterIndex;
    let rightLetterIdx = this.lettersRight.length - 1 - leftLetterIdx;

    this.lettersLeft.splice(leftLetterIdx + 1, 0, $event.newLetter);
    this.lettersRight.splice(rightLetterIdx, 0, $event.newLetter);
  }

  onBackspaceLeft($event: { letterIndex: number }) {

    let leftLetterIdx = $event.letterIndex;
    let rightLetterIdx = this.lettersRight.length - 1 - leftLetterIdx;
    console.log("backspace index","left", leftLetterIdx, "right",rightLetterIdx);

    this.lettersLeft.splice(leftLetterIdx, 1);
    this.lettersRight.splice(rightLetterIdx, 1);
  }
  onBackspaceRight($event: { letterIndex: number }) {
    let rightLetterIdx = $event.letterIndex;
    let leftLetterIdx = this.lettersLeft.length - 1 - rightLetterIdx;
    console.log("backspace index", "right",rightLetterIdx, "left", leftLetterIdx )


    this.lettersLeft.splice(leftLetterIdx, 1);
    this.lettersRight.splice(rightLetterIdx, 1);
  }
}
