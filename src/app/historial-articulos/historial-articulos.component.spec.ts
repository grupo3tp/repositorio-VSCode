import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialArticulosComponent } from './historial-articulos.component';

describe('HistorialArticulosComponent', () => {
  let component: HistorialArticulosComponent;
  let fixture: ComponentFixture<HistorialArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
