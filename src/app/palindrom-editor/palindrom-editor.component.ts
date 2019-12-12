import { Component, OnInit } from "@angular/core";
import { HtmlAstPath } from "@angular/compiler";

@Component({
  selector: "app-palindrom-editor",
  templateUrl: "./palindrom-editor.component.html",
  styleUrls: ["./palindrom-editor.component.scss"]
})
export class PalindromEditorComponent implements OnInit {
  lettersLeft = ["a"];
  lettersRight = ["a"];
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
  onAddCharRight($event) {
    let rightIdx = $event.letterIndex;
    let leftIdx = this.lettersRight.length - 1 - rightIdx;
    let character = $event.character;
    // var focusedElement = window.document.activeElement;

    this.addNewChar(
      this.lettersLeft,
      leftIdx,
      this.lettersRight,
      rightIdx + 1,
      character
    );
    this.focusOnNextElement("right", rightIdx);
  }

  onAddCharLeft($event) {
    let leftIdx = $event.letterIndex;
    let rightIdx = this.lettersLeft.length - 1 - leftIdx;
    let character = $event.character;
    // var focusedElement = window.document.activeElement;
  
    this.addNewChar(
      this.lettersRight,
      rightIdx,
      this.lettersLeft,
      leftIdx + 1,
      character
    );
    this.focusOnNextElement("left", leftIdx);
  
  }
  onNewCharFromPivot($event) {
    this.addNewChar(
      this.lettersLeft,
      this.lettersLeft.length,
      this.lettersRight,
      0,
      $event.newLetter
    );
  }
  onChangeCharRight() {}

  onChangeCharLeft() {}

  onDeleteRight() {}

  onDeleteLeft() {}

  onBackspaceRight() {}

  onBackspaceLeft() {}

  /*HELPERFUNCTIONS */
  getNodeIfLetterBox(currElement) {
    var nextElement = currElement.nextSibling;
    var nextNode =
      nextElement && nextElement.nodeName === this.letterBoxElement
        ? nextElement
        : "null";
    return Promise.resolve(nextNode);
  }

  focusOnNextElement(side, id) {

    var nextLetterBox = document.getElementById(side + (id + 1));
    if (nextLetterBox) {
      nextLetterBox.focus();
    } else {
      var checkExist = setInterval(function() {
        nextLetterBox = document.getElementById(side + (id + 1));
        if (nextLetterBox) {
          nextLetterBox.focus();
          clearInterval(checkExist);
        }
        // console.log("tried")
      }, 100);
    }
  }
  calculateWheretoDeleteFromOtherSide() {}

  isLetterVerification(character) {
    return (
      character.match(this.latinLettersRegex) ||
      character.match(this.hebrewLettersRegex)
    );
  }

  addNewChar(arr1, idx1, arr2, idx2, newChar) {
    var isLetter = this.isLetterVerification(newChar);
    if (isLetter) {
      arr1.splice(idx1, 0, newChar);
    }
    arr2.splice(idx2, 0, newChar);
  }

  deleteChar() {}
  // moveFocus($event: { keyCode: number }) {
  //   if ($event.keyCode === 39) {
  //     this.moveFocusRight();
  //   } else {
  //     this.moveFocusLeft();
  //   }
  // }
  // deleteLastLetterLeft() {
  //   let character = this.lettersLeft[this.lettersLeft.length - 1];
  //   if (this.lettersLeft.length > 0) {
  //     this.onBackspaceLeft({
  //       letterIndex: this.lettersLeft.length - 1,
  //       character
  //     });
  //   }
  // }
  // deleteLastLetterRight() {
  //   let character = this.lettersRight[0];
  //   if (this.lettersRight.length > 0) {
  //     this.onBackspaceRight({ letterIndex: 0, character });
  //   }
  //   this.pivotElement.focus();
  // }
  // moveFocusRight() {
  //   var focusedElement = window.document.activeElement;
  //   var nextElement = focusedElement.parentNode.nextSibling;

  //   if (nextElement) {
  //     if (
  //       this.nextElementIsLetterBox(
  //         focusedElement.parentNode,
  //         this.letterBoxElement
  //       ) ||
  //       this.nextElementIsLetterBox(
  //         focusedElement.parentNode,
  //         this.pivotElementNodeName
  //       )
  //     ) {
  //       this.focusOnElement(nextElement);
  //     } else if (nextElement.nextSibling) {
  //       if (
  //         this.nextElementIsLetterBox(nextElement, this.letterBoxElement) ||
  //         this.nextElementIsLetterBox(nextElement, this.pivotElementNodeName)
  //       ) {
  //         this.focusOnElement(nextElement.nextSibling);
  //       }
  //     }
  //   } else {
  //     return;
  //   }
  // }
  // moveFocusLeft() {
  //   var focusedElement = window.document.activeElement;
  //   var previousElement = focusedElement.parentNode.previousSibling;

  //   if (previousElement) {
  //     if (
  //       this.previousElementIsLetterBox(
  //         focusedElement.parentNode,
  //         this.letterBoxElement
  //       ) ||
  //       this.previousElementIsLetterBox(
  //         focusedElement.parentNode,
  //         this.pivotElementNodeName
  //       )
  //     ) {
  //       this.focusOnElement(previousElement);
  //     } else if (previousElement.previousSibling) {
  //       if (
  //         this.previousElementIsLetterBox(
  //           previousElement,
  //           this.letterBoxElement
  //         ) ||
  //         this.previousElementIsLetterBox(
  //           previousElement,
  //           this.pivotElementNodeName
  //         )
  //       ) {
  //         this.focusOnElement(previousElement.previousSibling);
  //       }
  //     }
  //   } else {
  //     return;
  //   }
  // }

  // onLetterInputRight($event: { character: string; letterIndex: number }) {
  //   let rightIdx = $event.letterIndex;
  //   let leftIdx = this.lettersRight.length - 1 - rightIdx;
  //   let character = $event.character;

  // onLetterInputLeft($event: { character: string; letterIndex: number }) {
  //   let leftIdx = $event.letterIndex;
  //   let rightIdx = this.lettersRight.length - 1 - leftIdx;
  //   let character = $event.character;
  //   this.addOrDeleteCharacter(
  //     this.lettersRight,
  //     this.lettersLeft,
  //     character,
  //     rightIdx,
  //     leftIdx, false
  //   );
  // }
  // onCharacterAddedRight($event: { character: string; letterIndex: number }) {
  //   let rightIdx = $event.letterIndex;
  //   let leftIdx = this.lettersRight.length - 1 - rightIdx;
  //   let character = $event.character;

  //   this.addOrDeleteCharacter(
  //     this.lettersLeft,
  //     this.lettersRight,
  //     character,
  //     leftIdx,
  //     rightIdx+1, false
  //   );
  // }
  // onCharacterAddedLeft($event: { character: string; letterIndex: number }) {
  //   let leftIdx = $event.letterIndex;
  //   let rightIdx = this.lettersRight.length - 1 - leftIdx;
  //   let character = $event.character;
  //   this.addOrDeleteCharacter(
  //     this.lettersRight,
  //     this.lettersLeft,
  //     character,
  //     rightIdx,
  //     leftIdx + 1, false
  //   );
  // }

  // onBackspaceLeft($event: { letterIndex: number; character: string }) {

  //   this.moveFocusOnDelete($event.letterIndex, this.lettersLeft);

  //   let leftIdx = $event.letterIndex;
  //   let deletedLetter = $event.character;
  //   var isLetter = this.isLetterVerification(deletedLetter);

  //   if (isLetter) {
  //     var letterIdx = this.getLetterFrequency(
  //       leftIdx,
  //       deletedLetter,
  //       this.lettersLeft
  //     );

  //     var rightIdx = this.findIndexOnOppositeSide(
  //       this.lettersRight,
  //       deletedLetter,
  //       letterIdx
  //     );
  //   }
  //   this.addOrDeleteCharacter(this.lettersRight, this.lettersLeft, null, rightIdx, leftIdx, true)
  // }
  // onBackspaceRight($event: { letterIndex: number; character: string }) {
  //   this.moveFocusOnDelete($event.letterIndex, this.lettersRight)

  //   let rightIdx = $event.letterIndex;
  //   let deletedLetter = $event.character;
  //   var isLetter = this.isLetterVerification(deletedLetter);

  //   if (isLetter) {
  //     var letterIdx = this.getLetterFrequency(
  //       rightIdx,
  //       deletedLetter,
  //       this.lettersRight
  //     );

  //     var leftIdx = this.findIndexOnOppositeSide(
  //       this.lettersLeft,
  //       deletedLetter,
  //       letterIdx
  //     );
  //   }
  //   this.addOrDeleteCharacter(this.lettersRight, this.lettersLeft, null, rightIdx, leftIdx, true)
  // }

  // previousElementIsLetterBox(currElement, nodeName) {
  //   var previousElement = currElement.previousSibling;
  //   var element =
  //     previousElement && previousElement.nodeName === nodeName
  //       ? previousElement
  //       : null;
  //   return element;
  // }

  // addOrDeleteCharacter(arr1, arr2, newChar, idx1, idx2, toDelete) {
  //   if(newChar){
  //     var isLetter = this.isLetterVerification(newChar);
  //   }
  //   if (isLetter || toDelete) {
  //     !toDelete ?arr1.splice(idx1, 0, newChar):arr1.splice(idx1, 1);
  //   }
  //   !toDelete ?arr2.splice(idx2, 0, newChar):arr2.splice(idx2, 1);
  // }

  // getLetterFrequency(idx, letter, lettersArr) {
  //   let letterIdx = 0;
  //   for (var i = 0; i <= idx; i++) {
  //     if (lettersArr[i] === letter) {
  //       letterIdx++;
  //     }
  //   }
  //   return letterIdx;
  // }

  // findIndexOnOppositeSide(lettersArr, letter, letterIdx) {
  //   for (var i = lettersArr.length - 1; i >= 0; i--) {
  //     if (lettersArr[i] === letter && letterIdx > 1) {
  //       letterIdx--;
  //     } else if (lettersArr[i] === letter && letterIdx === 1) {
  //       return i;
  //     }
  //   }
  // }
  // deleteRight($event){
  //   let leftIdx = $event.letterIndex;
  //   let deletedLetter = $event.character;
  //   var isLetter = this.isLetterVerification(deletedLetter);

  //   if (isLetter) {
  //     var letterIdx = this.getLetterFrequency(
  //       leftIdx,
  //       deletedLetter,
  //       this.lettersLeft
  //     );

  //     var rightIdx = this.findIndexOnOppositeSide(
  //       this.lettersRight,
  //       deletedLetter,
  //       letterIdx
  //     );
  //   }
  //   this.addOrDeleteCharacter(this.lettersRight, this.lettersLeft, null, rightIdx+1, leftIdx+1, true)

  // }

  // deleteLeft(){

  // }
  // moveFocusOnDelete(letterIndex, arr){
  //   var focusedElement = window.document.activeElement;
  //   var previousElement = this.previousElementIsLetterBox(
  //     focusedElement.parentNode,
  //     this.letterBoxElement
  //   );
  //   var nextElement = this.nextElementIsLetterBox(
  //     focusedElement.parentNode,
  //     this.letterBoxElement
  //   );
  //   if (letterIndex === arr.length - 1) {
  //     this.pivotElement.focus();
  //   } else if (previousElement) {
  //     this.focusOnElement(previousElement);
  //   } else if (nextElement) {
  //     this.focusOnElement(nextElement);
  //   } else {
  //     this.pivotElement.focus();
  //   }
  // }
}
