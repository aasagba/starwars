import { inject, TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { IPeopleResponse } from './swapi.interface';
import { swapiPeopleMock } from '../../../test/mock/api/swapi-mock';

describe('SwapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [SwapiService]
  }));

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  function setup(): {
    service: SwapiService,
    mockBackend: HttpTestingController,
    mockApiResponse: any
  } {
    const mockApiResponse: any = [];

    return {
      service: TestBed.get(SwapiService),
      mockBackend: TestBed.get(HttpTestingController),
      mockApiResponse
    };
  }

  it('should be created', () => {
    const service: SwapiService = TestBed.get(SwapiService);
    expect(service).toBeTruthy();
  });

  describe('getStarWarsPeople', () => {
    it('should construct url and call getStarWarsPeople', () => {
      const { mockBackend, service } = setup();
      const endpoint: string = 'https://swapi.co/api/people';
      const expectedResult: IPeopleResponse = swapiPeopleMock;
      let actualResult: IPeopleResponse = null;

      service.getStarWarsPeople()
        .subscribe((data: IPeopleResponse) => actualResult = data);

      mockBackend.expectOne(endpoint).flush(swapiPeopleMock);
      expect(actualResult).toEqual(expectedResult);
    });

    it('should be able to set search param', () => {
      const { mockBackend, service } = setup();
      const endpoint: string = 'https://swapi.co/api/people?search=r2';
      const expectedResult: IPeopleResponse = swapiPeopleMock;
      let actualResult: IPeopleResponse = null;

      service.getStarWarsPeople({ searchTerm: 'r2' })
        .subscribe((data: IPeopleResponse) => actualResult = data);

      mockBackend.expectOne(endpoint).flush(swapiPeopleMock);
      expect(actualResult).toEqual(expectedResult);
    });

    it('should be able to set page param', () => {
      const { mockBackend, service } = setup();
      const endpoint: string = 'https://swapi.co/api/people?page=2';
      const expectedResult: IPeopleResponse = swapiPeopleMock;
      let actualResult: IPeopleResponse = null;

      service.getStarWarsPeople({ page: '2' })
        .subscribe((data: IPeopleResponse) => actualResult = data);

      mockBackend.expectOne(endpoint).flush(swapiPeopleMock);
      expect(actualResult).toEqual(expectedResult);
    });

  });
});
