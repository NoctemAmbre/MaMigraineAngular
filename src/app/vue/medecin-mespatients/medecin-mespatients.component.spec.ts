import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinMespatientsComponent } from './medecin-mespatients.component';

describe('CompteMespatientsComponent', () => {
  let component: MedecinMespatientsComponent;
  let fixture: ComponentFixture<MedecinMespatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinMespatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinMespatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
