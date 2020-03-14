import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ClarityModule, ClrLayoutModule } from '@clr/angular';
import { SearchPageModule } from './page-components/search-page/search-page.module';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

describe('AppComponent', () => {
  let actions$: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        Store,
        provideMockActions(() => actions$)
      ],
      imports: [
        ClarityModule,
        ClrLayoutModule,
        SearchPageModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'starwars'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('starwars');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-search-page')).toBeDefined();
  });
});
