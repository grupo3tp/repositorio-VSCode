import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaActaComponent } from './nueva-acta.component';

describe('NuevaActaComponent', () => {
  let component: NuevaActaComponent;
  let fixture: ComponentFixture<NuevaActaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaActaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
