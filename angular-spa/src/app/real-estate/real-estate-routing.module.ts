import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealEstatesComponent } from './components/real-estates/real-estates.component';
import { NewRealEstateComponent } from './components/new-real-estate/new-real-estate.component';
import { EditRealEstateComponent } from './components/edit-real-estate/edit-real-estate.component';
import { ViewRealEstateComponent } from './components/view-real-estate/view-real-estate.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'search', component: RealEstatesComponent },
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
