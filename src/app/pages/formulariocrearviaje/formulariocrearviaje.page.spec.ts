import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulariocrearviajePage } from './formulariocrearviaje.page';

describe('FormulariocrearviajePage', () => {
  let component: FormulariocrearviajePage;
  let fixture: ComponentFixture<FormulariocrearviajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormulariocrearviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
