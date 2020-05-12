import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorUbicacionComponent } from './por-ubicacion.component';

describe('PorUbicacionComponent', () => {
  let component: PorUbicacionComponent;
  let fixture: ComponentFixture<PorUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
