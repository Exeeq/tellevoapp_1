import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulariocreardireccionesPage } from './formulariocreardirecciones.page';

describe('FormulariocreardireccionesPage', () => {
  let component: FormulariocreardireccionesPage;
  let fixture: ComponentFixture<FormulariocreardireccionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormulariocreardireccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
