import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ServicesService } from "../common/services/services";
import { PalindromSection } from "../common/services/services";

@Component({
  selector: "app-pivot-letter",
  templateUrl: "./pivot-letter.component.html",
  styleUrls: ["./pivot-letter.component.scss"]
})
export class PivotLetterComponent implements OnInit {
  pivotEl:HTMLElement;
  prevChar:string = '';
  input: string = "o";
  pivotIsCollapsed = false;
  @Output() newUserInput = new EventEmitter<{ newChar: string }>();
  @Output() moveFocus = new EventEmitter<{
    keyCode: number;
    side: PalindromSection;
    letterIdx: number;
  }>();
  @Output() backspace = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() setCompleteText = new EventEmitter<{char:string}>();

  constructor(private services: ServicesService) {}

  ngOnInit() {
    this.prevChar = this.input;
    this.pivotEl = document.getElementById('pivot-input')
  }

  expand() {
    this.pivotIsCollapsed = false;
  }
  handleClick(){
    this.services.setCursorPosition(this.pivotEl, 1);
  }
  
  onUserInput(event: KeyboardEvent) {
    event.preventDefault();
    this.services.setCursorPosition(this.pivotEl, 1);

    var isOneCharacter = this.input.length === 1;
    if (
      event.keyCode === 16 ||
      event.keyCode === 20 ||
      event.keyCode === 13 ||
      event.keyCode === 17
    ) {
      return;
    } else if (event.keyCode === 37 || event.keyCode === 39) {
      this.moveFocus.emit({
        keyCode: event.keyCode,
        side: PalindromSection.Pivot,
        letterIdx: -1
      });
    } else if (event.keyCode === 8 || event.keyCode === 46) {
      if (!this.pivotIsCollapsed) {
        this.pivotIsCollapsed = true;
        this.input = "";
        this.prevChar = "";
      } else {
        if (event.keyCode === 8) {
          this.backspace.emit();
        } else {
          if (event.keyCode === 46) {
            this.delete.emit();
          }
        }
      }
    } else if (isOneCharacter) {
      this.pivotIsCollapsed = false;
      
      event.preventDefault();
      this.newUserInput.emit({
        newChar: this.input
      });
      this.prevChar = this.input;
      return;
    } else if (this.input.length === 2) {
      this.newUserInput.emit({
        newChar: this.input
      });
      this.prevChar = this.input.charAt(1);
      this.input = this.input.charAt(1);
    }
    this.setCompleteText.emit({char:this.input})
  }
}
