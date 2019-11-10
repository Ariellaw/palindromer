import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotLetterComponent } from './pivot-letter.component';

describe('PivotLetterComponent', () => {
  let component: PivotLetterComponent;
  let fixture: ComponentFixture<PivotLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
