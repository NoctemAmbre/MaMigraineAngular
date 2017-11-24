import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspecComponent } from './prospec.component';

describe('ProspecComponent', () => {
  let component: ProspecComponent;
  let fixture: ComponentFixture<ProspecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
