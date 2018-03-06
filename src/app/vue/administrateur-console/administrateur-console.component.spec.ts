import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurConsoleComponent } from './administrateur-console.component';

describe('AdministrateurConsoleComponent', () => {
  let component: AdministrateurConsoleComponent;
  let fixture: ComponentFixture<AdministrateurConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrateurConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateurConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
