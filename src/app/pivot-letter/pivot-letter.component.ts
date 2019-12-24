import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ServicesService } from "../common/services/services";
import { PalindromSection } from "../common/services/services";

@Component({
  selector: "app-pivot-letter",
  templateUrl: "./pivot-letter.component.html",
  styleUrls: ["./pivot-letter.component.scss"]
})
export class PivotLetterComponent implements OnInit {
  input: string = "o";
  pivotIsCollapsed = false;
  @Output() newUserInput = new EventEmitter<{ newLetter: string }>();
  @Output() moveFocus = new EventEmitter<{
    keyCode: number;
    side: PalindromSection;
    letterIdx: number;
  }>();
  @Output() backspace = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor(private services: ServicesService) {}

  ngOnInit() {}

  expand() {
    this.pivotIsCollapsed = false;
  }
  onUserInput(event: KeyboardEvent) {
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
