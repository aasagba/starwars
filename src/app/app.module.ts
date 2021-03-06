import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, rootEffects } from './reducers';
import { SearchPageModule } from './page-components/search-page/search-page.module';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { SearchPageComponent } from './page-components/search-page/search-page.component';

export const routes = [
  { path: 'search/:term',  component: SearchPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    SearchPageModule,
    ClarityModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(rootEffects),
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
