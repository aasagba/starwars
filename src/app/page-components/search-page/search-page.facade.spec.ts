import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SearchPageFacade } from './search-page.facade';
import { State } from '../../reducers';
import { SearchPeopleAction } from './ngrx/actions';
import { IPeople, ISearchParams } from '../../api/swapi.interface';
import { SearchSelectors } from './ngrx/selectors';
import { of } from 'rxjs';
import { searchInitialState } from './ngrx/states.interface';

describe('SearchPageFacade', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SearchPageFacade,
        {
          provide: Store,
          useValue: {
            select: jest.fn(),
            dispatch: jest.fn()
          }
        }
      ]
    });
  });

  function setup(): {
    facade: SearchPageFacade,
    store: Store<State>,
  } {

    const store: Store<State> = TestBed.get(Store);
    const storeSelectSpy: any = store.select;

    storeSelectSpy.mockImplementation((selector: any) => {
      switch (selector) {
        case SearchSelectors.isLoading:
          return of(searchInitialState.isLoading);

        case SearchSelectors.people:
          return of(searchInitialState.people);

        case SearchSelectors.count:
          return of(searchInitialState.count);

        default:
          return null;
      }
    });

    return {
      facade: TestBed.get(SearchPageFacade),
      store: store,
    };
  }

  describe('searchPeople', () => {
    it('should dispatch SearchPeopleAction action', () => {
      const { facade, store } = setup();
      const expectedPayload: ISearchParams = { searchTerm: 'test' };
      facade.searchPeople(expectedPayload);

      expect(store.dispatch).toHaveBeenCalledWith(new SearchPeopleAction(expectedPayload));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    })
  });

  describe('selectors', () => {
    describe('isLoading$', () => {
      it('should return false by default', (done: Function) => {
        const { facade } = setup();

        facade.isLoading$.subscribe((values: boolean) => {
          expect(values).toEqual(false);
          done();
        });
      });

      describe('people$', () => {
        it('should return empty array by default', (done: Function) => {
          const { facade } = setup();

          facade.people$.subscribe((people: Array<IPeople>) => {
            expect(people).toEqual([]);
            done();
          });
        });
      });

      describe('count$', () => {
        it('should return 0 by default', (done: Function) => {
          const { facade } = setup();

          facade.count$.subscribe((count: number) => {
            expect(count).toEqual(0);
            done();
          });
        });
      });
    });
  });
});
