import { Component } from '@angular/core';
import { RealEstate } from '../../../shared/api-client';

@Component({
  selector: 'app-create-real-estate',
  template: `<app-real-estate-edit [realEstate]="realEstate"></app-real-estate-edit>`
})
export class CreateRealEstateComponent {
  realEstate: RealEstate = {} as RealEstate;
}
