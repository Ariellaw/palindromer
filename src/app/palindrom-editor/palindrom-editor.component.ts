import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-palindrom-editor',
  templateUrl: './palindrom-editor.component.html',
  styleUrls: ['./palindrom-editor.component.scss']
})
export class PalindromEditorComponent implements OnInit {
  lettersLeft=["a","b", "c"];
  lettersRight=["c", "b", "a" ];

  constructor() { }

  ngOnInit() {
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

  moveFocus($event:{keyCode:number}){
    var code  = $event.keyCode;
    var focusedElement = window.document.activeElement;
    if(focusedElement.parentNode.nextSibling && code===39){
      console.log("move focus",focusedElement, focusedElement.parentNode.nextSibling.childNodes[0])

      var nextElement = focusedElement.parentNode.nextSibling.childNodes[0] as HTMLElement;
      nextElement.focus();
    }else if(focusedElement.parentNode.previousSibling && code===37){
      var previousElement = focusedElement.parentNode.previousSibling.childNodes[0] as HTMLElement;
      previousElement.focus();
    }
  }
  onPivotChanged($letter:{newLetter:string}){
    this.lettersLeft.push($letter.newLetter);
    this.lettersRight.unshift($letter.newLetter);
  }

  onLetterInputRight($event:{newLetter:string, letterIndex: number}){
    let rightLetterIdx = $event.letterIndex;
    let leftLetterIdx = this.lettersRight.length-1-rightLetterIdx;

    this.lettersLeft[leftLetterIdx] = $event.newLetter;
    this.lettersRight[rightLetterIdx] = $event.newLetter;
  }
  onLetterInputLeft($event:{newLetter:string, letterIndex: number}){
    let leftLetterIdx = $event.letterIndex;
    let rightLetterIdx = this.lettersRight.length-1-leftLetterIdx;

    this.lettersLeft[leftLetterIdx] = $event.newLetter;
    this.lettersRight[rightLetterIdx] = $event.newLetter;
  }
  onLetterAddedRight($event:{newLetter:string, letterIndex: number}){
    let rightLetterIdx = $event.letterIndex;
    let leftLetterIdx = this.lettersRight.length-1-rightLetterIdx;

    this.lettersLeft.splice(leftLetterIdx, 0, $event.newLetter);
    this.lettersRight.splice(rightLetterIdx+1, 0, $event.newLetter);
  }
  onLetterAddedLeft($event:{newLetter:string, letterIndex: number}){
    let leftLetterIdx = $event.letterIndex;
    let rightLetterIdx = this.lettersRight.length-1-leftLetterIdx;

    this.lettersLeft.splice(leftLetterIdx+1, 0, $event.newLetter);
    this.lettersRight.splice(rightLetterIdx, 0, $event.newLetter)

  }

  onBackspaceLeft($event:{letterIndex:number}){
    let leftLetterIdx = $event.letterIndex;
    let rightLetterIdx = this.lettersRight.length-1-leftLetterIdx;
     
    this.lettersLeft.splice(leftLetterIdx,1);
    this.lettersRight.splice(rightLetterIdx,1);
  
  }
  onBackspaceRight($event:{letterIndex:number}){
    let rightLetterIdx = $event.letterIndex;
    let leftLetterIdx = this.lettersRight.length-1-rightLetterIdx;
    
    this.lettersLeft.splice(leftLetterIdx,1);
    this.lettersRight.splice(rightLetterIdx,1);
  }
}
