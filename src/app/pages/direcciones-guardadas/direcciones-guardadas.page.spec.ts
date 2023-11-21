import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireccionesGuardadasPage } from './direcciones-guardadas.page';

describe('DireccionesGuardadasPage', () => {
  let component: DireccionesGuardadasPage;
  let fixture: ComponentFixture<DireccionesGuardadasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DireccionesGuardadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
