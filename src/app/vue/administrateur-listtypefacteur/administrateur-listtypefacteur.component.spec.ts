import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurListtypefacteurComponent } from './administrateur-listtypefacteur.component';

describe('AdministrateurListtypefacteurComponent', () => {
  let component: AdministrateurListtypefacteurComponent;
  let fixture: ComponentFixture<AdministrateurListtypefacteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrateurListtypefacteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateurListtypefacteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
