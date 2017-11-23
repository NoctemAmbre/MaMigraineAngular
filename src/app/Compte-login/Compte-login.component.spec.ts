import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigraineLoginComponent } from './Compte-login.component';

describe('MigraineLoginComponent', () => {
  let component: MigraineLoginComponent;
  let fixture: ComponentFixture<MigraineLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigraineLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigraineLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
