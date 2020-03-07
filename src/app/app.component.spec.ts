import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {LetterBoxComponent} from './letter-box/letter-box.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PalindromEditorComponent} from './palindrom-editor/palindrom-editor.component';
import {PivotLetterComponent} from './pivot-letter/pivot-letter.component';
import {TextComponent} from './text/text.component';
import {FooterComponent} from './footer/footer.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        TextComponent,
        PalindromEditorComponent,
        LetterBoxComponent,
        PivotLetterComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'palindromer'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('palindromer');
  // });
  //
  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('palindromer app is running!');
  // });
});
