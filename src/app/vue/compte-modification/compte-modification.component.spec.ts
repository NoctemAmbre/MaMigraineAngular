import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteModificationComponent } from './compte-modification.component';

describe('CompteModificationComponent', () => {
  let component: CompteModificationComponent;
  let fixture: ComponentFixture<CompteModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
