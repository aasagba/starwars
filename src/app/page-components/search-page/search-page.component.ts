import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public searchPageForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm(): void {
    this.searchPageForm = new FormGroup({
      search: new FormControl('')
    });
  }

}
