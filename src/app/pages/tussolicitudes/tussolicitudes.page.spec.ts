import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TussolicitudesPage } from './tussolicitudes.page';

describe('TussolicitudesPage', () => {
  let component: TussolicitudesPage;
  let fixture: ComponentFixture<TussolicitudesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TussolicitudesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
