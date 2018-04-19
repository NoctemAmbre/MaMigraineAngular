import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurListmedecinComponent } from './administrateur-listmedecin.component';

describe('AdministrateurListmedecinComponent', () => {
  let component: AdministrateurListmedecinComponent;
  let fixture: ComponentFixture<AdministrateurListmedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrateurListmedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateurListmedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
