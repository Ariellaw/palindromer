import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PalindromEditorComponent } from './palindrom-editor/palindrom-editor.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';
import { PivotLetterComponent } from './pivot-letter/pivot-letter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PalindromEditorComponent,
    LetterBoxComponent,
    PivotLetterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
