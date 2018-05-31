import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealEstatesComponent } from './real-estates/real-estates.component';
import { NewRealEstateComponent } from './new-real-estate/new-real-estate.component';
import { EditRealEstateComponent } from './edit-real-estate/edit-real-estate.component';
import { ViewRealEstateComponent } from './view-real-estate/view-real-estate.component';
import { RealEstateRoutingModule } from './real-estate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'angular-image-slider';

@NgModule({
  imports: [
    CommonModule,
    RealEstateRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SliderModule
  ],
  declarations: [
    RealEstatesComponent,
    NewRealEstateComponent,
    EditRealEstateComponent,
    ViewRealEstateComponent
  ]
})
export class RealEstateModule {}
