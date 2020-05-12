import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorArticuloComponent } from './por-articulo.component';

describe('PorArticuloComponent', () => {
  let component: PorArticuloComponent;
  let fixture: ComponentFixture<PorArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
