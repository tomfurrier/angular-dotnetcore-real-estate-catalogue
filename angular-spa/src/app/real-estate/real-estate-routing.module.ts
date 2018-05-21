import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealEstatesComponent } from './real-estates/real-estates.component';
import { NewRealEstateComponent } from './new-real-estate/new-real-estate.component';
import { EditRealEstateComponent } from './edit-real-estate/edit-real-estate.component';
import { ViewRealEstateComponent } from './view-real-estate/view-real-estate.component';

const routes: Routes = [
  { path: 'real-estates', component: RealEstatesComponent },
  { path: 'new-real-estate', component: NewRealEstateComponent },
  { path: 'edit-real-estate', component: EditRealEstateComponent },
  { path: 'view-real-estate', component: ViewRealEstateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealEstateRoutingModule {}
