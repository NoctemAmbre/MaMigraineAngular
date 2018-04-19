import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurListfacteurComponent } from './administrateur-listfacteur.component';

describe('AdministrateurListfacteurComponent', () => {
  let component: AdministrateurListfacteurComponent;
  let fixture: ComponentFixture<AdministrateurListfacteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrateurListfacteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateurListfacteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
