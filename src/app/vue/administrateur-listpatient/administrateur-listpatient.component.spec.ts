import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurListpatientComponent } from './administrateur-listpatient.component';

describe('AdministrateurListpatientComponent', () => {
  let component: AdministrateurListpatientComponent;
  let fixture: ComponentFixture<AdministrateurListpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrateurListpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateurListpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
