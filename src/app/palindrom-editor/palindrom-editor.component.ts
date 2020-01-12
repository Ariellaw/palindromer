import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../common/services/services";
import { PalindromSection } from "../common/services/services";



@Component({
  selector: "app-palindrom-editor",
  templateUrl: "./palindrom-editor.component.html",
  styleUrls: ["./palindrom-editor.component.scss"]
})
export class PalindromEditorComponent implements OnInit {
  lettersLeft = ["t",  "a", "c"];
  lettersRight = ["c", "a", "t"];
  pivotElement: HTMLElement;
  isRightToLeft: boolean = false;

  constructor(private services: ServicesService) {}

  ngOnInit() {
    this.pivotElement = document.getElementById(
      PalindromSection.Pivot
    ) as HTMLElement;
    this.pivotElement.focus();

    this.services.setCompleteText("this is a completeText");
  }

  switchTextDirection(isRightToLeft) {
    this.isRightToLeft = isRightToLeft;
    console.log("isRightToLeft", isRightToLeft);
  }
  onAddCharRight($event) {
    let rightIdx = $event.letterIndex;
    let leftIdx = this.lettersRight.length - 1 - rightIdx;
    let character = $event.character;
    this.focusOnNextPreviousElement(
      PalindromSection.Right,
      rightIdx,
      true,
      1,
      this.lettersRight.length
    );
    this.addNewChar(
      this.lettersLeft,
      leftIdx,
      this.lettersRight,
      rightIdx + 1,
      character
    );
  }

  onAddCharLeft($event) {
    let character = $event.character;
    let leftIdx = $event.letterIndex;
    let rightIdx = this.lettersLeft.length - 1 - leftIdx;
    this.focusOnNextPreviousElement(
      PalindromSection.Left,
      leftIdx,
      true,
      1,
      this.lettersLeft.length
    );

    this.addNewChar(
      this.lettersRight,
      rightIdx,
      this.lettersLeft,
      leftIdx + 1,
      character
    );
  }
  onCharacterChangedRight($event: {
    prevChar: string;
    newChar: string;
    letterIndex: number;
  }) {
    this.replaceLetter(
      this.lettersLeft,
      this.lettersRight,
      $event.letterIndex,
      $event.prevChar,
      $event.newChar,
    );
  }

  onCharacterChangedLeft($event: {
    prevChar: string;
    newChar: string;
    letterIndex: number;
  }) {
    this.replaceLetter(
      this.lettersRight,
      this.lettersLeft,
      $event.letterIndex,
      $event.prevChar,
      $event.newChar,
    );
  }

  onNewCharFromPivot($event) {
    // this.pivotIsWorking=true;
    this.addNewChar(
      this.lettersLeft,
      this.lettersLeft.length,
      this.lettersRight,
      0,
      $event.newLetter
    );
  }

  moveFocus($event: {
    keyCode: number;
    side: PalindromSection;
    letterIdx: number;
  }) {
    if ($event.keyCode === 39) {
      this.moveFocusRight($event.side, $event.letterIdx);
    } else {
      this.moveFocusLeft($event.side, $event.letterIdx);
    }
  }

  /*HELPERFUNCTIONS */

  moveFocusRight(side, letterIdx) {
    if (
      side === PalindromSection.Right &&
      letterIdx === this.lettersRight.length - 1
    ) {
      document.getElementById("left0").focus();
    } else if (
      side === PalindromSection.Left &&
      letterIdx === this.lettersLeft.length - 1
    ) {
      console.log("this is the reason")
      this.pivotElement.focus();
    } else if (side === PalindromSection.Pivot) {
      document.getElementById("right0").focus();
    } else {
      this.focusOnNextPreviousElement(side, letterIdx, false, 1);
    }
  }
  moveFocusLeft(side: PalindromSection, letterIdx) {
    console.log("move focus", side, letterIdx)
    if (
      side === PalindromSection.Left &&
      letterIdx === 0 &&
      this.lettersRight.length > 0
    ) {
      document
        .getElementById(
          `${PalindromSection.Right}${this.lettersRight.length - 1}`
        )
        .focus();
    } else if (side === PalindromSection.Right && letterIdx === 0) {
      console.log("go to pivot",letterIdx )
      this.pivotElement.focus();
    } else if (side === PalindromSection.Pivot) {
      document
        .getElementById(
          `${PalindromSection.Left}${this.lettersLeft.length - 1}`
        )
        .focus();
    } else if (this.lettersRight.length > 0 || this.lettersLeft.length > 0) {
      this.focusOnNextPreviousElement(side, letterIdx, false, -1);
    } else {
      console.log("else")
      this.pivotElement.focus();
    }
  }

  onBackspaceLeft($event: { letterIndex: number; character: string }) {
    this.deleteChar(
      this.lettersRight,
      this.lettersLeft,
      $event.letterIndex,
      $event.character
    );
    if($event.letterIndex===0 && this.lettersLeft.length>=1){
      document.getElementById("left1").focus();
      return;
    }
    this.moveFocusLeft(PalindromSection.Left, $event.letterIndex);
  }

  onBackspaceRight($event: { letterIndex: number; character: string }) {
    this.deleteChar(
      this.lettersLeft,
      this.lettersRight,
      $event.letterIndex,
      $event.character
    );
    this.moveFocusLeft(PalindromSection.Right, $event.letterIndex);
  }
  deleteRight($event: { letterIndex: number; character: string }) {
    this.deleteChar(
      this.lettersLeft,
      this.lettersRight,
      $event.letterIndex,
      $event.character
    );
    this.moveFocusRight(PalindromSection.Right, $event.letterIndex);
  }

  deleteLeft($event: { letterIndex: number; character: string }) {
    this.deleteChar(
      this.lettersRight,
      this.lettersLeft,
      $event.letterIndex,
      $event.character
    );
    this.moveFocusRight(PalindromSection.Left, $event.letterIndex);
  }
  deleteFromPivot() {
    if (this.lettersRight.length > 0) {
      this.deleteChar(
        this.lettersLeft,
        this.lettersRight,
        0,
        this.lettersRight[0]
      );
      this.pivotElement.focus();
    }
  }

  backspaceFromPivot() {
    if (this.lettersLeft.length > 0) {
      this.deleteChar(
        this.lettersRight,
        this.lettersLeft,
        this.lettersLeft.length - 1,
        this.lettersLeft[this.lettersLeft.length - 1]
      );
      this.pivotElement.focus();
    }
  }

  getIdxFromLetterOnOtherSide(deletedLetter, arr1, arr2, idx2) {
    var letterIdx = this.countLetterUntilIndex(idx2, deletedLetter, arr2);

    var idx1 = this.findIndexOnOppositeSide(arr1, deletedLetter, letterIdx);
    return idx1;
  }



  focusOnNextPreviousElement(
    side: PalindromSection,
    id,
    waitForIt,
    backOrForward,
    arrLength = null
  ) {
    var nextLetterBox = document.getElementById(side + (id + backOrForward));
    if (nextLetterBox && !waitForIt) {
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

  addNewChar(arr1, idx1, arr2, idx2, newChar) {
    var isLetter = this.services.isLetterVerification(newChar);
    if (isLetter) {
      arr1.splice(idx1, 0, newChar);
    }
    arr2.splice(idx2, 0, newChar);
  }

  deleteChar(arr1, arr2, idx2, newChar) {
    console.log("delete Char", arr1, arr2, idx2, newChar)
    var isLetter = this.services.isLetterVerification(newChar);
    if (isLetter) {
      var idx1 = this.getIdxFromLetterOnOtherSide(newChar, arr1, arr2, idx2);
      arr1.splice(idx1, 1);
    } else {
    }
    arr2.splice(idx2, 1);
  }
  onEdit($event){
    console.log("on edit")
    var side = $event.side
    if(side === PalindromSection.Right){
      this.replaceLetter(this.lettersLeft, this.lettersRight,  $event.letterIdx, "k", $event.newChar);
      
    }else if(side === PalindromSection.Left){
      this.replaceLetter(this.lettersRight, this.lettersLeft, $event.letterIdx, "k", $event.newChar);
    }
    var el = document.getElementById(side+$event.letterIdx);
    console.log(el);
    el.focus();

  }
  replaceLetter(arr1, arr2, idx2, oldChar, newChar) {
    console.log("replaceLetter", arr1, arr2, idx2, oldChar, newChar)
    var isLetterOld = this.services.isLetterVerification(oldChar);
    var isLetterNew = this.services.isLetterVerification(newChar);
    var idx1 = this.getIdxFromLetterOnOtherSide(oldChar, arr1, arr2, idx2);

    if (isLetterOld && isLetterNew) {
      arr1[idx1] = newChar;
      arr2[idx2] = newChar;
    } else if (isLetterNew && !isLetterOld) {
      var lettersBeforeTargetCell = 0;
      arr2[idx2] = newChar;
      for (var i = 0; i < idx2; i++) {
        if (this.services.isLetterVerification(arr2[i])) {
          lettersBeforeTargetCell++;
        }
      }
      if (lettersBeforeTargetCell === 0) {
        arr1.splice(arr1.length, 0, newChar);
        return;
      }
      for (var j = arr1.length - 1; j >= 0; j--) {
        if (this.services.isLetterVerification(arr1[j])) {
          lettersBeforeTargetCell--;
        }
        if (lettersBeforeTargetCell === 0) {
          arr1.splice(j, 0, newChar);
          return;
        }
      }
    } else if (!isLetterNew && isLetterOld) {
      arr2[idx2] = newChar;
      arr1.splice(idx1, 1);
    }
  }


  countLetterUntilIndex(idx, letter, lettersArr) {
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
