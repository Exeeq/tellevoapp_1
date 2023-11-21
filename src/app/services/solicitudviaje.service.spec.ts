import { TestBed } from '@angular/core/testing';

import { SolicitudviajeService } from './solicitudviaje.service';

describe('SolicitudviajeService', () => {
  let service: SolicitudviajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudviajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
