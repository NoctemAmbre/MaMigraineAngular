import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigraineMesmigrainesComponent } from './migraine-mesmigraines.component';

describe('MigraineMesmigrainesComponent', () => {
  let component: MigraineMesmigrainesComponent;
  let fixture: ComponentFixture<MigraineMesmigrainesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigraineMesmigrainesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigraineMesmigrainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
