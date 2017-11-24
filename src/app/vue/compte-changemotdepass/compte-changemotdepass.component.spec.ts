import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteChangemotdepassComponent } from './compte-changemotdepass.component';

describe('CompteChangemotdepassComponent', () => {
  let component: CompteChangemotdepassComponent;
  let fixture: ComponentFixture<CompteChangemotdepassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteChangemotdepassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteChangemotdepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
