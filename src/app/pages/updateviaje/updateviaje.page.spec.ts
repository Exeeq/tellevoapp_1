import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateviajePage } from './updateviaje.page';

describe('UpdateviajePage', () => {
  let component: UpdateviajePage;
  let fixture: ComponentFixture<UpdateviajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
