import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentGestionComponent } from './medicament-gestion.component';

describe('MedicamentGestionComponent', () => {
  let component: MedicamentGestionComponent;
  let fixture: ComponentFixture<MedicamentGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
