import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurConsolemedicamentComponent } from './administrateur-consolemedicament.component';

describe('AdministrateurConsolemedicamentComponent', () => {
  let component: AdministrateurConsolemedicamentComponent;
  let fixture: ComponentFixture<AdministrateurConsolemedicamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrateurConsolemedicamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateurConsolemedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
