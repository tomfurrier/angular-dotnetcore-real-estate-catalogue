import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { MiscRoutingModule } from './misc-routing.module';

@NgModule({
  imports: [CommonModule, MiscRoutingModule],
  declarations: [ContactComponent, AboutComponent]
})
export class MiscModule {}
