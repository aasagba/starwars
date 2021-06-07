import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import { SearchPageFacade } from './search-page.facade';
import { BehaviorSubject } from 'rxjs';
import { IPeople, ISearchParams } from '../../api/swapi.interface';
import { mockPeople } from '../../../../test/mock/api/swapi-mock';
import { ClarityModule, ClrDatagrid, ClrDatagridStateInterface } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchModule } from '../../shared-components/search/search.module';

describe('SearchPageComponent', () => {
  const isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  const people$: BehaviorSubject<Array<IPeople>> = new BehaviorSubject(mockPeople);
  const count$: BehaviorSubject<number> = new BehaviorSubject(0);

  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let facade: SearchPageFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPageComponent ],
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        SearchModule,
        FormsModule
      ],
      providers: [
        {
          provide: SearchPageFacade,
          useValue: {
            searchPeople: jest.fn(),
            isLoading$: isLoading$.asObservable(),
            people$: people$.asObservable(),
            count$: count$.asObservable()
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(SearchPageFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('datagrid', () => {
    it('should be defined', () => {
      const dataGridCmp: ClrDatagrid = fixture.debugElement
        .query(By.directive(ClrDatagrid))
        .componentInstance;
      expect(dataGridCmp).toBeDefined();
    });

    it('should show placeholder and hide column titles is there is no data', () => {
      people$.next([]);
      fixture.detectChanges();
      const placeholder: ClrDatagrid = fixture.debugElement
        .query(By.directive(ClrDatagrid)).componentInstance;

      expect(placeholder).toBeTruthy();
    });
  });

  describe('search', () => {
    beforeEach(() => {
      people$.next(mockPeople);
    });

    it('it should call search on facade', () => {
      jest.spyOn(facade, 'searchPeople');

      component.search('Han Solo');
      expect(facade.searchPeople).toHaveBeenCalledWith({ searchTerm: 'Han Solo' });
    });

    it('should update datagrid with search results', () => {
      component.search('luke');

      expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('should reset pagination currentPage', () => {
      component.search('luke');
      expect(component.pagination.currentPage === 1);
    });
  });

  describe('pagination', () => {
    it('it should call searchPeople on the facade on a datagrid refresh event', () => {
      jest.spyOn(facade, 'searchPeople');

      const refreshState: ClrDatagridStateInterface = {
        page: {
          current: 1
        }
      };

      const expectedSearchParams: ISearchParams = {
        searchTerm: 'r2-d2',
        page: '1'
      };

      component.searchPageForm.controls.search.setValue('r2-d2');
      component.refresh(refreshState);
      expect(facade.searchPeople).toHaveBeenCalledWith(expectedSearchParams);
    });
  });


});
