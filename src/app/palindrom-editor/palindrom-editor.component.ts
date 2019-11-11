import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-palindrom-editor',
  templateUrl: './palindrom-editor.component.html',
  styleUrls: ['./palindrom-editor.component.scss']
})
export class PalindromEditorComponent implements OnInit {
  letters=[];
  lettersReversed=[];

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
  onLetterChanged($letter:{newLetter:string}){
    this.letters.push($letter.newLetter);
    this.lettersReversed.push($letter.newLetter);


  }

  onLetterInput($event:{newLetter:string, letterIndex: number}){

    let letterInd = $event.letterIndex;

    this.letters[letterInd] = $event.newLetter;
    this.lettersReversed[letterInd] = $event.newLetter;

  }
  onBackspace($event:{letterIndex:number}){
    let letterIdx = $event.letterIndex;
    this.letters.splice(letterIdx,1);
  }
}
