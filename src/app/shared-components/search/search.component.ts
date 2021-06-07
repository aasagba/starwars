import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input()
  public searchTerm = '';

  @Output()
  public searchEvent: EventEmitter<string> = new EventEmitter<string>();

  public searchGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    console.log('searchTerm', this.searchTerm);
    this.searchGroup = new FormGroup({
      search: new FormControl(this.searchTerm)
    });
  }

  public search(): void {
    const searchTerm: string =
      this.searchGroup.controls.search.value;

    // emit the search value
    this.searchEvent.emit(searchTerm);
  }

}
