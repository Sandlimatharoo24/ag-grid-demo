import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerEditor as DatepickerEditorComponent } from './datepicker-editor.component';

describe('DatepickerEditorComponent', () => {
  let component: DatepickerEditorComponent;
  let fixture: ComponentFixture<DatepickerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
