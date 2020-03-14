import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPeople } from '../../api/swapi.interface';
import { SearchPageFacade } from './search-page.facade';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public searchPageForm: FormGroup;
  public isLoading$: Observable<boolean>;
  public people$: Observable<Array<IPeople>>;

  constructor(private facade: SearchPageFacade) { }

  ngOnInit() {
    this.isLoading$ = this.facade.isLoading$;
    this.people$ = this.facade.people$;
    this.facade.searchPeople();
    this.setupForm();
  }

  private setupForm(): void {
    this.searchPageForm = new FormGroup({
      search: new FormControl('')
    });
  }

}
