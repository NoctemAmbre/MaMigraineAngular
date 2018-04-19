import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurListtypereponseComponent } from './administrateur-listtypereponse.component';

describe('AdministrateurListtypereponseComponent', () => {
  let component: AdministrateurListtypereponseComponent;
  let fixture: ComponentFixture<AdministrateurListtypereponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrateurListtypereponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateurListtypereponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
