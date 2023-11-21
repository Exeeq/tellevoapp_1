import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminoscondicionesPage } from './terminoscondiciones.page';

describe('TerminoscondicionesPage', () => {
  let component: TerminoscondicionesPage;
  let fixture: ComponentFixture<TerminoscondicionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TerminoscondicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
