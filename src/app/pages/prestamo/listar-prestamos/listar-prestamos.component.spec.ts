import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPrestamosComponent } from './listar-prestamos.component';

describe('ListarPrestamosComponent', () => {
  let component: ListarPrestamosComponent;
  let fixture: ComponentFixture<ListarPrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
