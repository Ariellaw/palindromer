import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../common/services/services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private services: ServicesService) {}

  ngOnInit() {
     
  }

}
