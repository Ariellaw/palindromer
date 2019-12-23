import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PalindromEditorComponent } from './palindrom-editor/palindrom-editor.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';
import { PivotLetterComponent } from './pivot-letter/pivot-letter.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TextComponent } from './text/text.component';
import {ConstantsService} from './common/services/constants'


@NgModule({
  declarations: [
    AppComponent,
    PalindromEditorComponent,
    LetterBoxComponent,
    PivotLetterComponent,
    FooterComponent,
    NavbarComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ConstantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
