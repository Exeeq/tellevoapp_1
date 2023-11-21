import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicalistaPage } from './musicalista.page';

describe('MusicalistaPage', () => {
  let component: MusicalistaPage;
  let fixture: ComponentFixture<MusicalistaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MusicalistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
