import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatailPage } from './datail.page';

describe('DatailPage', () => {
  let component: DatailPage;
  let fixture: ComponentFixture<DatailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DatailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
