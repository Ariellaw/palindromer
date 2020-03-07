import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterBoxComponent } from './letter-box.component';
import { FormsModule } from '@angular/forms';

describe('LetterBoxComponent', () => {
  let component: LetterBoxComponent;
  let fixture: ComponentFixture<LetterBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ LetterBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
