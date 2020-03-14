import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { SearchPageComponent } from './search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    SearchPageComponent
  ],
  providers: [],
  exports: [SearchPageComponent]
})
export class SearchPageModule {}
