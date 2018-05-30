import { NgModule } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [GalleriaModule, ButtonModule],
  exports: [GalleriaModule, ButtonModule]
})
export class PrimeNGModule {}
