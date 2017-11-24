import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinInformationComponent } from './medecin-information.component';

describe('MedecinInformationComponent', () => {
  let component: MedecinInformationComponent;
  let fixture: ComponentFixture<MedecinInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
