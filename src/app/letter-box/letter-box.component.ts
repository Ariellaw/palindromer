import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {ServicesService} from '../common/services/services';
import {PalindromSection} from '../common/services/services';

enum charTypes  {
  Letter = "letter",
  Punctuation = "punctuation",
  Space = "space"
}

@Component({
  selector: "app-letter-box",
  templateUrl: "./letter-box.component.html",
  styleUrls: ["./letter-box.component.scss"]
})
export class LetterBoxComponent implements OnInit {
  currChar:string="";
  typeOfChar: charTypes = charTypes.Letter;
  @Input() character: string = "";
  @Input() side: string = "";
  @Input() index: number; //TODO: should a letterbox be aware of its index? maybe there's another solution?
  @Output() characterChanged = new EventEmitter<{
    prevChar: string;
    newChar:string;
    letterIndex: number;
  }>();
  @Output() backspace = new EventEmitter<{
    letterIndex: number;
    character: string;
  }>();
  @Output() newUserInput = new EventEmitter<{ newLetter: string }>();
  @Output() moveFocus = new EventEmitter<{ keyCode: number, side:PalindromSection, letterIdx:number }>();
  @Output() characterAdded = new EventEmitter<{
    character: string;
    letterIndex: number;
  }>();
  @Output() delete = new EventEmitter<{letterIndex: number; character: string;}>();


  constructor(private services: ServicesService) {}

  ngOnInit() {
    this.assignCharacterType();
    this.currChar = this.character;
  }


  handleKeyup(event: KeyboardEvent) {
    if (event.keyCode === 37 || event.keyCode === 39) {
      var side:PalindromSection;
      if(this.side===PalindromSection.Right){side = PalindromSection.Right}
      else if(this.side === PalindromSection.Left){side = PalindromSection.Left}
      this.moveFocus.emit({ keyCode: event.keyCode, side, letterIdx:this.index });
    } else if (event.keyCode === 8) {
      event.preventDefault();
      this.backspace.emit({
        letterIndex: this.index,
        character: this.currChar
      });
    }else if(event.keyCode === 46){
      this.delete.emit({
        letterIndex: this.index,
        character: this.character
      });
    } else if(event.keyCode===16 || event.keyCode===20 || event.keyCode===13 || event.keyCode===17 ){
      return;
    }
     else if(this.character.length===2){
      this.characterAdded.emit({
        character: this.character.charAt(1),
        letterIndex: this.index
      });
      this.character=this.character.charAt(0);
    }else if(this.character.length===1){
      this.characterChanged.emit({
        prevChar: this.currChar,
        newChar: this.character,
        letterIndex: this.index
      })
      this.currChar = this.character;
    }
  }

  assignCharacterType() {
    var isLetter = this.services.isLetterVerification(this.character);
    if (isLetter) {
      this.typeOfChar = charTypes.Letter;
    } else if (this.character === " ") {
      this.typeOfChar = charTypes.Space
    } else {
      this.typeOfChar = charTypes.Punctuation;
    }
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
