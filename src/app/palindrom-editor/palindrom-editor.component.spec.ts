import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalindromEditorComponent } from './palindrom-editor.component';

describe('PalindromEditorComponent', () => {
  let component: PalindromEditorComponent;
  let fixture: ComponentFixture<PalindromEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalindromEditorComponent ]
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
