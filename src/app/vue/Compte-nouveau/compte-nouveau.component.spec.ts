import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteNouveauComponent } from './compte-nouveau.component';

describe('CompteNouveauComponent', () => {
  let component: CompteNouveauComponent;
  let fixture: ComponentFixture<CompteNouveauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteNouveauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteNouveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
