import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteLoginComponent } from './Compte-login.component';

describe('MigraineLoginComponent', () => {
  let component: CompteLoginComponent;
  let fixture: ComponentFixture<CompteLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
