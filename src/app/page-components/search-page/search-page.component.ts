import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPeople, ISearchParams } from '../../api/swapi.interface';
import { SearchPageFacade } from './search-page.facade';
import { ClrDatagridPagination, ClrDatagridStateInterface } from '@clr/angular';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  public searchPageForm: FormGroup;
  public isLoading$: Observable<boolean>;
  public people$: Observable<Array<IPeople>>;
  public total$: Observable<number>;
  public searchTerm = '';

  @ViewChild('pagination')
  pagination: ClrDatagridPagination;

  constructor(private facade: SearchPageFacade, private route: ActivatedRoute, private router: Router) {
    // this.route.params.subscribe( params => console.log(params) );
  }

  ngOnInit() {
    this.isLoading$ = this.facade.isLoading$;
    this.people$ = this.facade.people$;
    this.total$ = this.facade.count$;
    this.setupForm();

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.searchTerm = params.get('term');
        console.log(`ngAfterViewInit searchTerm ${this.searchTerm}`);
        this.facade.searchPeople(
          { searchTerm: this.searchTerm });
      }
    );
  }

  public search(searchTerm: string): void {
    // this.facade.searchPeople({ searchTerm });
    this.router.navigateByUrl(`/search/${searchTerm}`);
    // reset pagination currentpage
    this.pagination.currentPage = 1;
  }

  public refresh(state: ClrDatagridStateInterface): void {
    console.log('state', state);
    console.log('refresh');
    const searchTerm: string =
      this.searchPageForm.controls.search.value;

    const searchParams: ISearchParams = {
      searchTerm,
      page: state.page
        ? state.page.current.toString()
        : ''
    };

    this.facade.searchPeople(searchParams);
  }

  private setupForm(): void {
    this.searchPageForm = new FormGroup({
      search: new FormControl('')
    });
  }

  ngAfterViewInit(): void {
  }

}
