import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.scss']
})
export class LetterBoxComponent implements OnInit {
  @Input() letter:string="h";
  @Input() index: number; //TODO: should a letterbox be aware of its index? maybe there's another solution?

  @Output() backspace = new EventEmitter<{letterIndex:number}>()
  @Output() userInput = new EventEmitter<{newLetter:string, letterIndex: number}>()
  @Output() rightArrowKey = new EventEmitter<{}>();
  constructor() { }

  ngOnInit() {
  }
  
  onUserInput(event: any){

    if(event.keyCode===39){
      console.log("right click");
      this.rightArrowKey.emit();
    }
    var lettersRegex = /^[A-Za-z]+$/;

    if(this.letter.match(lettersRegex)){
    this.userInput.emit({newLetter : this.letter, letterIndex: this.index})
    }else if(event.key === "Backspace"){
      this.backspace.emit({
        letterIndex:this.index
      })

    }
  }


}
