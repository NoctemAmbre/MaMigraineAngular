import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurConsolefacteurComponent } from './administrateur-consolefacteur.component';

describe('AdministrateurConsolefacteurComponent', () => {
  let component: AdministrateurConsolefacteurComponent;
  let fixture: ComponentFixture<AdministrateurConsolefacteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrateurConsolefacteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateurConsolefacteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
