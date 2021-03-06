import { Component, OnInit, OnDestroy } from '@angular/core'
import { ServicesService } from '../common/services/services'
import { PalindromSection } from '../common/services/services'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-palindrom-editor',
  templateUrl: './palindrom-editor.component.html',
  styleUrls: ['./palindrom-editor.component.scss']
  // providers: [ServicesService]
})
export class PalindromEditorComponent implements OnInit, OnDestroy {
  lettersLeft = ['t', 'a', 'c']
  lettersRight = ['c', 'a', 't']
  pivotChar = ['o']
  pivotElement: HTMLElement
  pivotLetterBox: HTMLInputElement
  isRightToLeft: boolean = false
  typingTimer //timer identifier
  doneTypingInterval = 1000
  langSubscription: Subscription

  constructor (private services: ServicesService) {}

  ngOnInit () {
    this.pivotElement = document.getElementById(
      PalindromSection.Pivot
    ) as HTMLElement
    this.pivotElement.focus()
    this.pivotLetterBox = document.getElementById(
      PalindromSection.Pivot
    ) as HTMLInputElement
    this.setCompleteText()

    this.langSubscription = this.services.directionChanged.subscribe(
      (isRightToLeft: boolean) => {
        console.log('subscription RTL', isRightToLeft)
        this.isRightToLeft = isRightToLeft
      }
    )
  }

  onDeleteNextChar ($event) {
    if ($event.side === PalindromSection.Left) {
      this.deleteChar(
        this.lettersRight,
        this.lettersLeft,
        $event.letterIdx,
        this.lettersLeft[$event.letterIdx]
      )
    } else {
      this.deleteChar(
        this.lettersLeft,
        this.lettersRight,
        $event.letterIdx,
        this.lettersRight[$event.letterIdx]
      )
    }
  }

  onDeletePreviousChar ($event) {
    if ($event.side === PalindromSection.Left) {
      this.deleteChar(
        this.lettersRight,
        this.lettersLeft,
        $event.letterIdx,
        this.lettersLeft[$event.letterIdx]
      )
    } else {
      this.deleteChar(
        this.lettersLeft,
        this.lettersRight,
        $event.letterIdx,
        this.lettersRight[$event.letterIdx]
      )
    }
  }
  switchTextDirection (isRightToLeft) {
    console.log('step 1 isRightToLeft', isRightToLeft)
    this.services.setDirection(isRightToLeft)
  }
  onAddCharRight ($event) {
    // setTimeout(() => this.focusOnNextPreviousElement(
    //   PalindromSection.Right,
    //   $event.idx,
    //   true,
    //   1,
    // ), 1000);

    this.addNewChar(
      $event.oldChar,
      $event.newChar,
      this.lettersRight,
      this.lettersLeft,
      $event.idx
    )
    this.focusOnNextPreviousElement(PalindromSection.Right, $event.idx, true, 1)
  }

  onAddCharLeft ($event) {
    this.focusOnNextPreviousElement(
      PalindromSection.Left,
      $event.idx,
      true,
      1,
      this.lettersLeft.length
    )

    this.addNewChar(
      $event.oldChar,
      $event.newChar,
      this.lettersLeft,
      this.lettersRight,
      $event.idx
    )
  }

  onCharacterChangedRight ($event: {
    prevChar: string
    newChar: string
    letterIdx: number
  }) {
    this.replaceLetter(
      this.lettersLeft,
      this.lettersRight,
      $event.letterIdx,
      $event.prevChar,
      $event.newChar
    )
  }

  onCharacterChangedLeft ($event: {
    prevChar: string
    newChar: string
    letterIdx: number
  }) {
    this.replaceLetter(
      this.lettersRight,
      this.lettersLeft,
      $event.letterIdx,
      $event.prevChar,
      $event.newChar
    )
  }

  onNewCharFromPivot ($event: { newChar: string }) {
    var char = $event.newChar

    if ($event.newChar.length === 2) {
      this.lettersRight.unshift(char.charAt(0))
      if (this.services.isLetterVerification(char.charAt(0))) {
        this.lettersLeft.push(char.charAt(0))
      }
      this.pivotChar[0] = char.charAt(1)
    } else if ($event.newChar.length === 1) {
      this.pivotChar[0] = char.charAt(0)
    } else if ($event.newChar.length === 0) {
      this.pivotChar = ['']
    }

    this.setCompleteText()
  }

  moveFocus ($event: {
    keyCode: number
    side: PalindromSection
    letterIdx: number
  }) {
    if ($event.keyCode === 39) {
      this.moveFocusRight($event.side, $event.letterIdx, 1)
    } else {
      this.moveFocusLeft($event.side, $event.letterIdx)
    }
  }

  /*HELPERFUNCTIONS */

  moveFocusRight (side, letterIdx, isArrow = 0) {
    var rightLength = this.lettersRight.length
    var leftLength = this.lettersLeft.length

    if (side === PalindromSection.Right) {
      if (rightLength === 0 && leftLength === 0) {
        this.pivotElement.focus()
        return
      } else if (
        letterIdx === rightLength ||
        (letterIdx === rightLength - 1 && isArrow)
      ) {
        this.focusOnNextPreviousElement(PalindromSection.Left, 0, true, 0)
        return
      }

      this.focusOnNextPreviousElement(side, letterIdx, true, isArrow)
    } else if (side === PalindromSection.Left) {
      if (
        letterIdx === leftLength ||
        (letterIdx === leftLength - 1 && isArrow)
      ) {
        this.pivotElement.focus()
        return
      }
      this.focusOnNextPreviousElement(side, letterIdx, true, isArrow)
    } else if (side === PalindromSection.Pivot) {
      if (rightLength >= 1) {
        this.focusOnNextPreviousElement(PalindromSection.Right, 0, false, 0)
      }
    }
  }
  moveFocusLeft (side: PalindromSection, letterIdx) {
    if (
      side === PalindromSection.Left &&
      letterIdx === 0 &&
      this.lettersRight.length > 0
    ) {
      document
        .getElementById(
          `${PalindromSection.Right}${this.lettersRight.length - 1}`
        )
        .focus()
    } else if (side === PalindromSection.Right && letterIdx === 0) {
      this.pivotElement.focus()
    } else if (side === PalindromSection.Pivot) {
      document
        .getElementById(
          `${PalindromSection.Left}${this.lettersLeft.length - 1}`
        )
        .focus()
    } else if (this.lettersRight.length > 0 || this.lettersLeft.length > 0) {
      this.focusOnNextPreviousElement(side, letterIdx, false, -1)
    } else {
      this.pivotElement.focus()
    }
  }

  onBackspaceLeft ($event: { letterIdx: number; character: string }) {
    this.deleteChar(
      this.lettersRight,
      this.lettersLeft,
      $event.letterIdx,
      $event.character
    )
    if ($event.letterIdx === 0 && this.lettersLeft.length >= 1) {
      document.getElementById('left1').focus()
      return
    }
    this.moveFocusLeft(PalindromSection.Left, $event.letterIdx)
  }

  onBackspaceRight ($event: { letterIdx: number; character: string }) {
    this.deleteChar(
      this.lettersLeft,
      this.lettersRight,
      $event.letterIdx,
      $event.character
    )
    this.moveFocusLeft(PalindromSection.Right, $event.letterIdx)
  }

  deleteRight ($event: { letterIdx: number; character: string }) {
    this.deleteChar(
      this.lettersLeft,
      this.lettersRight,
      $event.letterIdx,
      $event.character
    )

    this.moveFocusRight(PalindromSection.Right, $event.letterIdx, 0)
  }

  deleteLeft ($event: { letterIdx: number; character: string }) {
    this.deleteChar(
      this.lettersRight,
      this.lettersLeft,
      $event.letterIdx,
      $event.character
    )
    this.moveFocusRight(PalindromSection.Left, $event.letterIdx)
  }
  deleteFromPivot () {
    if (this.lettersRight.length > 0) {
      this.deleteChar(
        this.lettersLeft,
        this.lettersRight,
        0,
        this.lettersRight[0]
      )
      this.pivotElement.focus()
    }
  }

  backspaceFromPivot () {
    if (this.lettersLeft.length > 0) {
      this.deleteChar(
        this.lettersRight,
        this.lettersLeft,
        this.lettersLeft.length - 1,
        this.lettersLeft[this.lettersLeft.length - 1]
      )
      this.pivotElement.focus()
    }
  }

  getIdxFromLetterOnOtherSide (char, arr1, arr2, idx2) {
    let letterIdx = this.countLetterUntilIndex(idx2, char, arr2)

    let idx1 = this.findIndexOnOppositeSide(arr1, char, letterIdx)

    return idx1
  }

  focusOnNextPreviousElement (
    side: PalindromSection,
    idx,
    waitForIt,
    backOrForward,
    arrLength = null
  ) {
    let nextLetterBox = document.getElementById(side + (idx + backOrForward))
    if (nextLetterBox && !waitForIt) {
      nextLetterBox.focus()
    } else if (waitForIt) {
      let checkExist = setInterval(function () {
        nextLetterBox = document.getElementById(side + (idx + backOrForward))
        if (nextLetterBox) {
          nextLetterBox.focus()
          clearInterval(checkExist)
        }
      }, 100)
    } else return false
  }

  addNewChar (oldChar, newChar, alteredArr, oppositeArr, idx2) {
    this.replaceLetter(oppositeArr, alteredArr, idx2, oldChar, newChar)
    var isLetter = this.services.isLetterVerification(oldChar)
    alteredArr.splice(idx2, 0, oldChar)
    if (isLetter) {
      var idx1 = this.getIdxFromLetterOnOtherSide(
        newChar,
        oppositeArr,
        alteredArr,
        idx2
      )
      oppositeArr.splice(idx1 + 1, 0, oldChar)
    }
    this.setCompleteText()
  }

  deleteChar (arr1, arr2, idx2, newChar) {
    let idx2Exists = this.verifyIdx(arr2, idx2)

    if (idx2Exists) {
      let isLetter = this.services.isLetterVerification(newChar)
      if (isLetter) {
        let idx1 = this.getIdxFromLetterOnOtherSide(newChar, arr1, arr2, idx2)
        let idx1Exists = this.verifyIdx(arr1, idx1)
        if (idx1Exists) {
          arr1.splice(idx1, 1)
        }
      }
      arr2.splice(idx2, 1)
    }
    this.setCompleteText()
  }
  onEdit ($event) {
    let side = $event.side
    if (side === PalindromSection.Right) {
      this.replaceLetter(
        this.lettersLeft,
        this.lettersRight,
        $event.letterIdx,
        'k',
        $event.newChar
      )
    } else if (side === PalindromSection.Left) {
      this.replaceLetter(
        this.lettersRight,
        this.lettersLeft,
        $event.letterIdx,
        'k',
        $event.newChar
      )
    }
    let el = document.getElementById(side + $event.letterIdx)
    el.focus()
    this.setCompleteText()
  }
  replaceLetter (arr1, arr2, idx2, oldChar, newChar) {
    let isLetterOld = this.services.isLetterVerification(oldChar)
    let isLetterNew = this.services.isLetterVerification(newChar)
    let idx1 = this.getIdxFromLetterOnOtherSide(oldChar, arr1, arr2, idx2)

    if (isLetterOld && isLetterNew) {
      arr1[idx1] = newChar
      arr2[idx2] = newChar
    } else if (isLetterNew && !isLetterOld) {
      let lettersBeforeTargetCell = 0
      arr2[idx2] = newChar
      for (let i = 0; i < idx2; i++) {
        if (this.services.isLetterVerification(arr2[i])) {
          lettersBeforeTargetCell++
        }
      }
      if (lettersBeforeTargetCell === 0) {
        arr1.splice(arr1.length, 0, newChar)
        return
      }
      for (let j = arr1.length - 1; j >= 0; j--) {
        if (this.services.isLetterVerification(arr1[j])) {
          lettersBeforeTargetCell--
        }
        if (lettersBeforeTargetCell === 0) {
          arr1.splice(j, 0, newChar)
          return
        }
      }
    } else if (!isLetterNew && isLetterOld) {
      arr2[idx2] = newChar
      arr1.splice(idx1, 1)
    }
    this.setCompleteText()
  }

  countLetterUntilIndex (idx, letter, arr) {
    let letterIdx = 0
    for (let i = 0; i <= idx; i++) {
      if (this.services.isLetterVerification(arr[i])) {
        letterIdx++
      }
    }
    return letterIdx
  }

  findIndexOnOppositeSide (lettersArr, letter, letterIdx) {
    for (let i = lettersArr.length - 1; i >= 0; i--) {
      if (this.services.isLetterVerification(lettersArr[i])) {
        letterIdx--
      }
      if (letterIdx === 0) {
        return i
      }
    }
  }

  verifyIdx (arr, idx) {
    return idx < arr.length
  }

  setCompleteText () {
    // console.log("setCompleteText",a.charAt(1), a.length , this.pivotElement)
    this.services.setCompleteText(
      this.lettersLeft.join('') + this.pivotChar[0] + this.lettersRight.join('')
    )
  }

  ngOnDestroy () {
    this.langSubscription.unsubscribe()
  }
}
