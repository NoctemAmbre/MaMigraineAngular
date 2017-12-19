import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacteurGestionComponent } from './facteur-gestion.component';

describe('FacteurGestionComponent', () => {
  let component: FacteurGestionComponent;
  let fixture: ComponentFixture<FacteurGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacteurGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacteurGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
