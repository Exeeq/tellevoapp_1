import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajetomadoPage } from './viajetomado.page';

describe('ViajetomadoPage', () => {
  let component: ViajetomadoPage;
  let fixture: ComponentFixture<ViajetomadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViajetomadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
