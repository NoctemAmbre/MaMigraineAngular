import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteInformationComponent } from './compte-information.component';

describe('CompteInformationComponent', () => {
  let component: CompteInformationComponent;
  let fixture: ComponentFixture<CompteInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
