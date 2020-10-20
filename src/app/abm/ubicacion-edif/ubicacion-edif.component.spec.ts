import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionEdifComponent } from './ubicacion-edif.component';

describe('UbicacionEdifComponent', () => {
  let component: UbicacionEdifComponent;
  let fixture: ComponentFixture<UbicacionEdifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionEdifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionEdifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
