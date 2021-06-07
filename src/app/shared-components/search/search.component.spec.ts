import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search', () => {
    it('should call search and emit a search event', () => {
      jest.spyOn(component, 'search');
      jest.spyOn(component.searchEvent, 'emit');

      const serchInput: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      serchInput.value = 'test';
      serchInput.dispatchEvent(new Event('search'));

      expect(component.search).toHaveBeenCalled();
      expect(component.searchEvent.emit).toHaveBeenCalledWith('test');
    });
  });
});
