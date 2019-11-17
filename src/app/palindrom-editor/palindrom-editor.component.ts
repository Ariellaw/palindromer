import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-palindrom-editor',
  templateUrl: './palindrom-editor.component.html',
  styleUrls: ['./palindrom-editor.component.scss']
})
export class PalindromEditorComponent implements OnInit {
  lettersLeft=[];
  lettersRight=[];

  constructor() { }

  ngOnInit() {
    console.log("started", window.document);
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

  }
  onLetterAddedLeft($event:{newLetter:string, letterIndex: number}){
    let leftLetterIdx = $event.letterIndex;
    let rightLetterIdx = this.lettersRight.length-1-leftLetterIdx;

      this.lettersLeft.splice(leftLetterIdx+1, 0, $event.newLetter);
      this.lettersRight.splice(rightLetterIdx, 0, $event.newLetter)

  }




  onBackspace($event:{letterIndex:number}){
    let leftLetterIdx = $event.letterIndex;
    let rightLetterIdx = this.lettersRight.length-1-leftLetterIdx;
    this.lettersLeft.splice(leftLetterIdx,1);
    this.lettersRight.splice(rightLetterIdx,1);
  }
}
