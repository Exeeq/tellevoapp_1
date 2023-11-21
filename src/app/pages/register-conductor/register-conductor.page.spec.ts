import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterConductorPage } from './register-conductor.page';

describe('RegisterConductorPage', () => {
  let component: RegisterConductorPage;
  let fixture: ComponentFixture<RegisterConductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
