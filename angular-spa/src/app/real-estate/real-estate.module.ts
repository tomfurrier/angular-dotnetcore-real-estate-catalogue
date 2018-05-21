import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealEstatesComponent } from './real-estates/real-estates.component';
import { NewRealEstateComponent } from './new-real-estate/new-real-estate.component';
import { EditRealEstateComponent } from './edit-real-estate/edit-real-estate.component';
import { SearchComponent } from './search/search.component';
import { ViewRealEstateComponent } from './view-real-estate/view-real-estate.component';
import { RealEstateRoutingModule } from './real-estate-routing.module';

@NgModule({
  imports: [CommonModule, RealEstateRoutingModule],
  declarations: [
    RealEstatesComponent,
    NewRealEstateComponent,
    EditRealEstateComponent,
    SearchComponent,
    ViewRealEstateComponent
  ]
})
export class RealEstateModule {}
