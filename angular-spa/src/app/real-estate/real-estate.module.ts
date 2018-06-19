import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealEstatesComponent } from './components/real-estates/real-estates.component';
import { NewRealEstateComponent } from './components/new-real-estate/new-real-estate.component';
import { EditRealEstateComponent } from './components/edit-real-estate/edit-real-estate.component';
import { ViewRealEstateComponent } from './components/view-real-estate/view-real-estate.component';
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
