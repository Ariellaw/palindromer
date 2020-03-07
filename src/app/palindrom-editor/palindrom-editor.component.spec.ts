import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalindromEditorComponent } from './palindrom-editor.component';
import {FormsModule} from '@angular/forms';
import {LetterBoxComponent} from '../letter-box/letter-box.component';
import {NavbarComponent} from '../navbar/navbar.component';
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
});
