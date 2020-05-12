import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorSectorComponent } from './por-sector.component';

describe('PorSectorComponent', () => {
  let component: PorSectorComponent;
  let fixture: ComponentFixture<PorSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
