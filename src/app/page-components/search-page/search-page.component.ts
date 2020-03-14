import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPeople, ISearchParams } from '../../api/swapi.interface';
import { SearchPageFacade } from './search-page.facade';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public searchPageForm: FormGroup;
  public isLoading$: Observable<boolean>;
  public people$: Observable<Array<IPeople>>;
  public total$: Observable<number>;

  constructor(private facade: SearchPageFacade) { }

  ngOnInit() {
    this.isLoading$ = this.facade.isLoading$;
    this.people$ = this.facade.people$;
    this.total$ = this.facade.count$;
    this.facade.searchPeople();
    this.setupForm();
  }

  public search(): void {
    const searchTerm: string = this.searchPageForm.controls.search.value;
    this.facade.searchPeople({ searchTerm });
  }

  private setupForm(): void {
    this.searchPageForm = new FormGroup({
      search: new FormControl('')
    });
  }

  refresh(state: ClrDatagridStateInterface) {
    const searchTerm: string = this.searchPageForm.controls.search.value;

    const searchParams: ISearchParams = {
      searchTerm,
      page: state.page.current.toString()
    };

    this.facade.searchPeople(searchParams);
  }

}
