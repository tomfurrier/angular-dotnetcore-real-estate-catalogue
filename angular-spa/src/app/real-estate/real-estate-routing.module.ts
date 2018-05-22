import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealEstatesComponent } from './real-estates/real-estates.component';
import { NewRealEstateComponent } from './new-real-estate/new-real-estate.component';
import { EditRealEstateComponent } from './edit-real-estate/edit-real-estate.component';
import { ViewRealEstateComponent } from './view-real-estate/view-real-estate.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: RealEstatesComponent },
  {
    path: 'new-real-estate',
    component: NewRealEstateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'edit-real-estate', component: EditRealEstateComponent },
  { path: 'view-real-estate', component: ViewRealEstateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RealEstateRoutingModule {}
