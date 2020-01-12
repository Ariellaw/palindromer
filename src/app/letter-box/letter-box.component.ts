import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { ServicesService } from '../common/services/services'
import { PalindromSection } from '../common/services/services'

enum charTypes {
  Letter = 'letter',
  Punctuation = 'punctuation',
  Space = 'space'
}

@Component({
  selector: 'app-letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.scss']
})
export class LetterBoxComponent implements OnInit {
  currChar: string = ''
  typeOfChar: charTypes = charTypes.Letter
  @Input() character: string = ''
  @Input() side: string = ''
  @Input() index: number //TODO: should a letterbox be aware of its index? maybe there's another solution?
  @Output() characterChanged = new EventEmitter<{
    prevChar: string
    newChar: string
    letterIndex: number
  }>()
  @Output() backspace = new EventEmitter<{
    letterIndex: number
    character: string
  }>()
  @Output() newUserInput = new EventEmitter<{ newLetter: string }>()
  @Output() moveFocus = new EventEmitter<{
    keyCode: number
    side: PalindromSection
    letterIdx: number
  }>()
  @Output() characterAdded = new EventEmitter<{
    character: string
    letterIndex: number
  }>()
  @Output() delete = new EventEmitter<{
    letterIndex: number
    character: string
  }>()
  @Output() replaceLetter = new EventEmitter<{
    newChar:string
    letterIdx:number,
    side: string
  }>()



  constructor (private services: ServicesService) {}

  ngOnInit () {
    this.assignCharacterType()
    this.currChar = this.character;
  }

  //
  handleKeyup (event: KeyboardEvent) {
    var side: PalindromSection;
    this.currChar = this.character;
    var currEl = document.getElementById(side+this.index)

    if (this.side === PalindromSection.Right) {
      side = PalindromSection.Right
    } else if (this.side === PalindromSection.Left) {
      side = PalindromSection.Left
    }

    if (event.shiftKey && (event.keyCode === 37 || event.keyCode === 39)) {
      return
    } else if (event.keyCode === 37 || event.keyCode === 39) {
      if (this.currChar.length === 2) {
        this.character = this.currChar.charAt(0)
        this.currChar = this.currChar.charAt(0)
        return
      }

      this.moveFocus.emit({
        keyCode: event.keyCode,
        side,
        letterIdx: this.index
      })
    } else if (event.keyCode === 8) {
      if(this.character.length==1){
        console.log(this.currChar, this.doGetCaretPosition(currEl));
        this.replaceLetter.emit({
          newChar:this.character,
          letterIdx: this.index,
          side:side
        })
        this.currChar = this.character;
        return;
      }
      this.backspace.emit({
        letterIndex: this.index,
        character: this.currChar
      })
    } else if (event.keyCode === 46) {
      if(this.character.length==1){
        console.log(this.currChar, this.doGetCaretPosition(currEl));
        this.replaceLetter.emit({
          newChar:this.character,
          letterIdx: this.index,
          side:side
        })
        this.currChar = this.character;
        return;
      }
      this.delete.emit({
        letterIndex: this.index,
        character: this.character
      })
    } else if (
      event.keyCode === 16 ||
      event.keyCode === 20 ||
      event.keyCode === 13 ||
      event.keyCode === 17
    ) {
      return
    } else if (this.character.length === 2) {
      this.characterAdded.emit({
        character: this.character.charAt(1),
        letterIndex: this.index
      })
      this.character = this.character.charAt(0)
    } else if (this.character.length === 1) {
      this.characterChanged.emit({
        prevChar: this.currChar,
        newChar: this.character,
        letterIndex: this.index
      })
      this.currChar = this.character
    }
  }

  assignCharacterType () {
    var isLetter = this.services.isLetterVerification(this.character)
    if (isLetter) {
      this.typeOfChar = charTypes.Letter
    } else if (this.character === ' ') {
      this.typeOfChar = charTypes.Space
    } else {
      this.typeOfChar = charTypes.Punctuation
    }
  }

  doGetCaretPosition (oField) {

    // Initialize
    var iCaretPos = 0;
  
    // // IE Support
    // if (document.selection) {
  
    //   // Set focus on the element
    //   oField.focus();
  
    //   // To get cursor position, get empty selection range
    //   var oSel = document.selection.createRange();
  
    //   // Move selection start to 0 position
    //   oSel.moveStart('character', -oField.value.length);
  
    //   // The caret position is selection length
    //   iCaretPos = oSel.text.length;
    // }
  
    // Firefox support
    //  if (oField.selectionStart || oField.selectionStart == '0')
    //   iCaretPos = oField.selectionDirection=='backward' ? oField.selectionStart : oField.selectionEnd;
  
    // Return results
    return iCaretPos;
  }  

}


//TODO: read about preventDefault()
//TODO: https://stackoverflow.com/questions/35105374/how-to-force-a-components-re-rendering-in-angular-2
//fix CSS
//support for punctation and spaces
//Support for deleting puncuation
//collapse pivot:
// add to github pages
//Add a services page
