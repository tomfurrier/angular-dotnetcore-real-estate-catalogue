import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../primeng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { RealEstateListComponent } from './real-estate-list/real-estate-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    PrimeNGModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    PrimeNGModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    RealEstateListComponent,
    SearchComponent
  ],
  declarations: [SearchComponent, RealEstateListComponent]
})
export class SharedModule {}
