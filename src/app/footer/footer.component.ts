import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from "../common/services/services";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() isRightToLeft;
  @Output() changeScreenDirection = new EventEmitter<{isRightToLeft:boolean}>();

  constructor(private services: ServicesService) {}

  ngOnInit() {
    
  }

  switchScreenDirection(isRighToLeft){
    this.changeScreenDirection.emit({isRightToLeft:isRighToLeft});

  }

}
