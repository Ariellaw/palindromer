import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-pivot-letter",
  templateUrl: "./pivot-letter.component.html",
  styleUrls: ["./pivot-letter.component.scss"]
})
export class PivotLetterComponent implements OnInit {
  input: string = "o";
  @Output() newUserInput = new EventEmitter<{ newLetter: string }>();
  @Output() moveFocus = new EventEmitter<{ keyCode: number, side:string, letterIdx:number }>();
  pivotIsCollapsed = false;
  @Output() backspace = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  expand() {
    this.pivotIsCollapsed = false;
  }
  onUserInput(event: KeyboardEvent) {
    var isOneCharacter = this.input.length === 1;
    
    if (event.keyCode === 37 || event.keyCode === 39) {
      this.moveFocus.emit({ keyCode: event.keyCode, side:"pivot-input", letterIdx:-1});
    } else if (event.keyCode === 8 || event.keyCode === 46) {
      if (!this.pivotIsCollapsed) {
        this.pivotIsCollapsed = true;
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
      return;
    } else if (this.input.length === 2) {
      var newCharacter = this.input.charAt(0);
      this.newUserInput.emit({
        newLetter: newCharacter
      });
      this.input = this.input.slice(1);
    }
  }
}
