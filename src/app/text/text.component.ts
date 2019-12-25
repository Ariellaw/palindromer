import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../common/services/services";


@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
 text:string

  constructor(private services: ServicesService) {}

  ngOnInit() {
  }

  
}
