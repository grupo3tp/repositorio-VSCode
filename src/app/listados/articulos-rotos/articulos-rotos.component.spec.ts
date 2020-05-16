import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosRotosComponent } from './articulos-rotos.component';

describe('ArticulosRotosComponent', () => {
  let component: ArticulosRotosComponent;
  let fixture: ComponentFixture<ArticulosRotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulosRotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosRotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
