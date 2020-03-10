import { Component, OnInit, OnDestroy } from '@angular/core'
import { ServicesService } from '../common/services/services'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, OnDestroy {
  text: string
  isRightToLeft: boolean = false
  private subscription: Subscription
  private langSubscription: Subscription

  constructor (private services: ServicesService) {}

  ngOnInit () {
    this.text = this.services.completeText
    this.subscription = this.services.textChanged.subscribe((text: string) => {
      this.text = text
    })
    this.langSubscription = this.services.directionChanged.subscribe(
      (isRightToLeft: boolean) => {
        console.log("subscription RTL", isRightToLeft)
        this.isRightToLeft = isRightToLeft
      }
    )
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }
}
