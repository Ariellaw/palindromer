import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from "../common/services/services";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, OnDestroy {
 text:string;
 private subscription: Subscription

  constructor(private services: ServicesService) {}

  ngOnInit() {
    this.text = this.services.completeText;
    this.subscription = this.services.textChanged.subscribe((text:string) => {
      console.log("subscribe", text)
      this.text = text;
    })
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
