import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PalindromEditorComponent } from './palindrom-editor/palindrom-editor.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';

@NgModule({
  declarations: [
    AppComponent,
    PalindromEditorComponent,
    LetterBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
