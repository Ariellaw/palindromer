import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalindromEditorComponent } from './palindrom-editor.component';
import {FormsModule} from '@angular/forms';
import {LetterBoxComponent} from '../letter-box/letter-box.component';
import {PivotLetterComponent} from '../pivot-letter/pivot-letter.component';

describe('PalindromEditorComponent', () => {
  let component: PalindromEditorComponent;
  let fixture: ComponentFixture<PalindromEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        PalindromEditorComponent,
        LetterBoxComponent,
        PivotLetterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalindromEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "tacocat" when first loaded', () => {
    fixture.detectChanges();

    let compiled = fixture.nativeElement;

    //get text content of the palindrom editor
    // let lettersInputs = compiled.querySelectorAll('input'); //this should work, but it doesn't for some reason, so I do this instead:
    // let lettersInputs = document.querySelectorAll('#palindrom-container  input');
    let lettersInputs = compiled.querySelectorAll('#palindrom-container  input');
    let palindromContent = "";
    lettersInputs.forEach( inp => palindromContent += inp.value)

    expect(palindromContent).toBe('tacocat');
  });
});
