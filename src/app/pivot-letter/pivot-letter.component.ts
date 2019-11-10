import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-pivot-letter",
  templateUrl: "./pivot-letter.component.html",
  styleUrls: ["./pivot-letter.component.scss"]
})
export class PivotLetterComponent implements OnInit {
  letter: string = "a";
  @Output() newUserInput = new EventEmitter<{ newLetter: string }>();
  constructor() {}

  ngOnInit() {}
  onUserInput(event: KeyboardEvent ) {
    console.log("test1", this.letter);
      this.newUserInput.emit({
        newLetter: this.letter
      });
      this.letter = event.key;
      console.log("test2" ,this.letter);
  }
}
