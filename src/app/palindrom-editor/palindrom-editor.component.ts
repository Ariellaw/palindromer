import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palindrom-editor',
  templateUrl: './palindrom-editor.component.html',
  styleUrls: ['./palindrom-editor.component.scss']
})
export class PalindromEditorComponent implements OnInit {
  letters=[];

  constructor() { }

  ngOnInit() {
  }
  onLetterChanged($letter:{newLetter:string}){
    // console.log("onLetterChanged", $letter.newLetter);
    this.letters.push($letter.newLetter);
  }

  onLetterInput($event:{newLetter:string, letterIndex: number}){
    console.log('onLeftLetterInput: ', $event);

    let letterInd = $event.letterIndex;

    this.letters[letterInd] = $event.newLetter;
  }
}
