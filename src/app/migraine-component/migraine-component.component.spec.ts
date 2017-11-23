import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigraineComponentComponent } from './migraine-component.component';

describe('MigraineComponentComponent', () => {
  let component: MigraineComponentComponent;
  let fixture: ComponentFixture<MigraineComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigraineComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigraineComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
