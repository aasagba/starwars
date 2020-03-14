import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../reducers';
import { HttpClientModule } from '@angular/common/http';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { SearchPeopleEffect } from './effects';
import { SearchPageFacade } from '../search-page.facade';
import { SwapiService } from '../../../api/swapi.service';
import { swapiPeopleMock } from '../../../../../test/mock/api/swapi-mock';
import { SearchPeopleAction, SearchPeopleFailureAction, SearchPeopleSuccessAction } from './actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { cold, hot } from 'jasmine-marbles';

describe('SearchPeopleEffect', () => {
  let effects: SearchPeopleEffect;
  let action$: Observable<any>;
  let service: any;
  let facade: SearchPageFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        HttpClientModule,
      ],
      providers: [
        provideMockActions(() => action$),
        SearchPeopleEffect,
        SearchPageFacade,
        {
          provide: SwapiService,
          useValue: {
            getStarWarsPeople: jest.fn()
          }
        }
      ],
    });

    effects = TestBed.get(SearchPeopleEffect);
    service = TestBed.get(SwapiService);
    facade = TestBed.get(SearchPageFacade);
  });

  describe('searchPeople$', () => {
    it('should dispatch SearchPeopleSuccessAction on success', () => {
      service.getStarWarsPeople.mockReturnValue(of(swapiPeopleMock));

      const triggerAction: SearchPeopleAction = new SearchPeopleAction({ searchTerm: 'test' });
      const expectedAction: SearchPeopleSuccessAction = new SearchPeopleSuccessAction(swapiPeopleMock);
      const expected$: TestColdObservable = cold('a', { a: expectedAction });
      action$ = hot('b', { b: triggerAction });

      expect(effects.searchPeople$).toBeObservable(expected$);
    });

    it('should dispatch SearchPeopleFailureAction on failure', () => {
      const mockError: Error = new Error('Error message');
      service.getStarWarsPeople.mockReturnValue(throwError(mockError));

      const triggerAction: SearchPeopleAction = new SearchPeopleAction({ searchTerm: 'test' });
      const expectedAction: SearchPeopleFailureAction = new SearchPeopleFailureAction(mockError);
      const expected$: TestColdObservable = cold('a', { a: expectedAction });
      action$ = hot('b', { b: triggerAction });

      expect(effects.searchPeople$).toBeObservable(expected$);
    });
  });

});
