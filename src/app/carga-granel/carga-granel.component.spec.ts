import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaGranelComponent } from './carga-granel.component';

describe('CargaGranelComponent', () => {
  let component: CargaGranelComponent;
  let fixture: ComponentFixture<CargaGranelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaGranelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaGranelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
