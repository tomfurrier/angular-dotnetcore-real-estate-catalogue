import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RealEstatesComponent } from './real-estate/real-estates/real-estates.component';

const routes: Routes = [
  // { path: '', component: RealEstatesComponent },
  // {
  //   path: 'training',
  //   loadChildren: './training/training.module#TrainingModule',
  //   canLoad: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
