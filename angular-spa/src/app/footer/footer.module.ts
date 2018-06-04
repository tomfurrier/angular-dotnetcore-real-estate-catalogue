import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { FooterRoutingModule } from './footer-routing.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [FooterRoutingModule],
  exports: []
})
export class FooterModule {}
