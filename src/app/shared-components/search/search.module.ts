import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  providers: [],
  imports: [
    CommonModule,
    BrowserModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent]
})
export class SearchModule {}
