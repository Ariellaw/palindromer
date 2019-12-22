import { Component, OnInit } from "@angular/core";
import { HtmlAstPath } from "@angular/compiler";

@Component({
  selector: "app-palindrom-editor",
  templateUrl: "./palindrom-editor.component.html",
  styleUrls: ["./palindrom-editor.component.scss"]
})
export class PalindromEditorComponent implements OnInit {
  lettersLeft = ["a", "b", "c"];
  lettersRight = ["c", "b", "a"];
  punctionationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/;
  latinLettersRegex = /^[A-Za-z]+$/;
  hebrewLettersRegex = "^[א-ת]+$";
  pivotElement: HTMLElement;
  letterBoxElement = "APP-LETTER-BOX";
  pivotElementNodeName = "APP-PIVOT-LETTER";
  letterBox;
  pivotIsWorking=false;
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
    this.focusOnNextPreviousElement("right", rightIdx, true, 1, this.lettersRight.length);
    this.addNewChar(
      this.lettersLeft,
      leftIdx,
      this.lettersRight,
      rightIdx + 1,
      character
    );
    
  }
  onCharacterChangedRight($event: {prevChar: string; newChar:string; letterIndex: number}) {
    console.log("onChangeCharRight", $event.prevChar, $event.newChar , $event.letterIndex);
    this.replaceLetter(this.lettersLeft, this.lettersRight, $event.letterIndex, $event.prevChar, $event.newChar);

  }

  onCharacterChangedLeft($event: {prevChar: string; newChar:string; letterIndex: number}) {
    console.log("onChangeCharLeft", $event.prevChar ,$event.newChar , $event.letterIndex);
    this.replaceLetter(this.lettersRight, this.lettersLeft, $event.letterIndex,  $event.prevChar, $event.newChar);

  }

  onAddCharLeft($event) {
    console.log("onAddCharLeft", $event)

    this.letterBox= $event.character;
    let leftIdx = $event.letterIndex;
    let rightIdx = this.lettersLeft.length - 1 - leftIdx;
    let character = $event.character;
    this.focusOnNextPreviousElement("left", leftIdx, true, 1, this.lettersLeft.length);

    this.addNewChar(
      this.lettersRight,
      rightIdx,
      this.lettersLeft,
      leftIdx + 1,
      character
    );
  }
  onNewCharFromPivot($event) {
    this.pivotIsWorking=true;
    this.addNewChar(
      this.lettersLeft,
      this.lettersLeft.length,
      this.lettersRight,
      0,
      $event.newLetter
    );
  }





  moveFocus($event: { keyCode: number; side: string; letterIdx: number }) {
    if ($event.keyCode === 39) {
      this.moveFocusRight($event.side, $event.letterIdx);
    }else {
      this.moveFocusLeft($event.side, $event.letterIdx);

    }

  }

  /*HELPERFUNCTIONS */

  moveFocusRight(side, letterIdx){
    if (
      side === "right" &&
      letterIdx === this.lettersRight.length-1
    ) {
      document.getElementById("left0").focus();
    } else if (
      side === "left" &&
      letterIdx === this.lettersLeft.length-1
    ) {
      this.pivotElement.focus();
    } else if (side === "pivot-input") {
      document.getElementById("right0").focus();
    } else {
      this.focusOnNextPreviousElement(side, letterIdx, false, 1);
    }
  }
  moveFocusLeft(side, letterIdx){
    console.log("moveFocusLeft", side, letterIdx);
    if (
      side === "left" &&
      letterIdx === 0 && this.lettersRight.length>0
    ) {
      document.getElementById(`right${this.lettersRight.length-1}`).focus();
    } else if (
      side === "right" &&
      letterIdx === 0
    ) {
      this.pivotElement.focus();
    } else if (side === "pivot-input") {
      document.getElementById(`left${this.lettersLeft.length-1}`).focus();
    } else if(this.lettersRight.length>0 && this.lettersLeft.length>0) {
      this.focusOnNextPreviousElement(side, letterIdx, false, -1);
    }
    else{
      this.pivotElement.focus();
    }
  }

  onBackspaceLeft($event: { letterIndex: number; character: string }) {
    console.log("onBackspaceLeft",$event);
    this.deleteChar(this.lettersRight, this.lettersLeft, $event.letterIndex, $event.character);
    this.moveFocusLeft("left", $event.letterIndex)
  }

  onBackspaceRight($event: { letterIndex: number; character: string }) {

    this.deleteChar(this.lettersLeft, this.lettersRight, $event.letterIndex, $event.character);
    this.moveFocusLeft("right", $event.letterIndex);
  }
  deleteRight($event: { letterIndex: number; character: string }){
    this.deleteChar(this.lettersLeft, this.lettersRight, $event.letterIndex, $event.character);
    this.moveFocusRight("right", $event.letterIndex);


  }

  deleteLeft($event: { letterIndex: number; character: string }){
    this.deleteChar(this.lettersRight, this.lettersLeft, $event.letterIndex, $event.character);
    this.moveFocusRight("left", $event.letterIndex);
  }
  deleteFromPivot(){
    if(this.lettersRight.length>0){
      this.deleteChar(this.lettersLeft, this.lettersRight, 0 , this.lettersRight[0]);
      this.pivotElement.focus();
    }
  }

  backspaceFromPivot(){
    if(this.lettersLeft.length>0){
      this.deleteChar(this.lettersRight, this.lettersLeft, this.lettersLeft.length-1, this.lettersLeft[this.lettersLeft.length-1]);
      this.pivotElement.focus();
    }
  }

  getIdxFromLetterOnOtherSide(deletedLetter, arr1, arr2, idx2  ){
      var letterIdx = this.getLetterFrequency(
        idx2,
        deletedLetter,
        arr2
      );

      var idx1 = this.findIndexOnOppositeSide(
        arr1,
        deletedLetter,
        letterIdx
      );
      return idx1;
  }

  getNodeIfLetterBox(currElement) {
    var nextElement = currElement.nextSibling;
    var nextNode =
      nextElement && nextElement.nodeName === this.letterBoxElement
        ? nextElement
        : "null";
    return Promise.resolve(nextNode);
  }

  focusOnNextPreviousElement(side, id, waitForIt, backOrForward, arrLength=null) {
    console.log("focusOnNextPreviousElement", side, id, waitForIt, backOrForward)
    var nextLetterBox = document.getElementById(side + (id + backOrForward));
    if (nextLetterBox  && !waitForIt) {
      nextLetterBox.focus();
    } else if (waitForIt) {
      var checkExist = setInterval(function() {
        nextLetterBox = document.getElementById(side + (id + backOrForward));
        if (nextLetterBox) {
          nextLetterBox.focus();
          clearInterval(checkExist);
        }
      }, 100);
    } else return false;
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

  deleteChar(arr1, arr2, idx2, newChar) {
    var isLetter = this.isLetterVerification(newChar);
    if (isLetter) {
       var idx1 =this.getIdxFromLetterOnOtherSide(newChar, arr1, arr2, idx2);
      arr1.splice(idx1, 1);
    }else{
    }
    arr2.splice(idx2, 1);
  }

  replaceLetter(arr1, arr2, idx2, oldChar, newChar){
    var isLetterOld = this.isLetterVerification(oldChar);
    var isLetterNew = this.isLetterVerification(newChar);
    var idx1 = this.getIdxFromLetterOnOtherSide(oldChar, arr1, arr2, idx2);
    console.log("replaceLetter", arr1, idx1, arr2, idx2, oldChar, newChar);

    if(isLetterOld && isLetterNew){
      arr1[idx1] = newChar;
      arr2[idx2] = newChar;
    }else if(isLetterNew && !isLetterOld){
      return;
    }else if(!isLetterNew && isLetterOld){
      arr2[idx2]=newChar;
      arr1.splice(idx1,1);
    }
  }
  //both are letters
  //letter replaced by punctuation
  //puntuation replaced by letter
  //

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
