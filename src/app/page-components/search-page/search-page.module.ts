import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { SearchPageComponent } from './search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPageFacade } from './search-page.facade';
import { SearchPeopleEffect } from './ngrx/effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      SearchPeopleEffect
    ]),
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    SearchPageComponent
  ],
  providers: [SearchPageFacade],
  exports: [SearchPageComponent]
})
export class SearchPageModule {}
