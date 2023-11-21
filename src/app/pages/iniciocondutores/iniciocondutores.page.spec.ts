import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciocondutoresPage } from './iniciocondutores.page';

describe('IniciocondutoresPage', () => {
  let component: IniciocondutoresPage;
  let fixture: ComponentFixture<IniciocondutoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IniciocondutoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
