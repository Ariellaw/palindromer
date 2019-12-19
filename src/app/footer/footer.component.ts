import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  screenwidth:number;
  @Input() isRightToLeft:string="false";
  @Output() changeScreenDirection = new EventEmitter<{isRightToLeft:boolean}>();

  constructor() { }

  ngOnInit() {
    this.screenwidth=window.innerWidth;
  }

  switchScreenDirection(isRighToLeft){
    console.log("switchScreenDirection", isRighToLeft)
    this.changeScreenDirection.emit({isRightToLeft:isRighToLeft});

  }

}
